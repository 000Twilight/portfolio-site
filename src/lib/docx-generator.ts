/**
 * Native, zero-dependency OpenXML (.docx) generator.
 * Builds a valid Microsoft Word .docx file (ZIP archive containing Word OpenXML standards)
 * with exact 1-inch margins, A4 page dimensions, clean Calibri typography, and natural paragraph spacing.
 */

interface ZipFileEntry {
  name: string;
  data: Uint8Array;
}

// Precomputed CRC-32 table
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[i] = c;
}

function crc32(buf: Uint8Array): number {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function createZip(files: ZipFileEntry[]): Uint8Array {
  const encoder = new TextEncoder();
  const fileRecords: {
    nameBytes: Uint8Array;
    data: Uint8Array;
    crc: number;
    offset: number;
  }[] = [];

  let offset = 0;
  const parts: Uint8Array[] = [];

  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const data = file.data;
    const crc = crc32(data);

    // Local file header (30 bytes + name length)
    const header = new Uint8Array(30 + nameBytes.length);
    const view = new DataView(header.buffer);
    view.setUint32(0, 0x04034b50, true); // Local file header signature
    view.setUint16(4, 10, true); // Version needed (1.0)
    view.setUint16(6, 0, true); // Flags
    view.setUint16(8, 0, true); // Compression (0 = stored)
    view.setUint16(10, 0, true); // Mod time
    view.setUint16(12, 0, true); // Mod date
    view.setUint32(14, crc, true); // CRC-32
    view.setUint32(18, data.length, true); // Compressed size
    view.setUint32(22, data.length, true); // Uncompressed size
    view.setUint16(26, nameBytes.length, true); // Name length
    view.setUint16(28, 0, true); // Extra field length
    header.set(nameBytes, 30);

    parts.push(header);
    parts.push(data);

    fileRecords.push({
      nameBytes,
      data,
      crc,
      offset,
    });

    offset += header.length + data.length;
  }

  const centralDirOffset = offset;
  let centralDirSize = 0;

  for (const record of fileRecords) {
    // Central directory header (46 bytes + name length)
    const cdHeader = new Uint8Array(46 + record.nameBytes.length);
    const view = new DataView(cdHeader.buffer);
    view.setUint32(0, 0x02014b50, true); // Central directory signature
    view.setUint16(4, 20, true); // Version made by
    view.setUint16(6, 10, true); // Version needed
    view.setUint16(8, 0, true); // Flags
    view.setUint16(10, 0, true); // Compression (0 = stored)
    view.setUint16(12, 0, true); // Mod time
    view.setUint16(14, 0, true); // Mod date
    view.setUint32(16, record.crc, true); // CRC-32
    view.setUint32(20, record.data.length, true); // Compressed size
    view.setUint32(24, record.data.length, true); // Uncompressed size
    view.setUint16(28, record.nameBytes.length, true); // Name length
    view.setUint16(30, 0, true); // Extra field length
    view.setUint16(32, 0, true); // Comment length
    view.setUint16(34, 0, true); // Disk start
    view.setUint16(36, 0, true); // Internal attributes
    view.setUint32(38, 0, true); // External attributes
    view.setUint32(42, record.offset, true); // Offset of local header
    cdHeader.set(record.nameBytes, 46);

    parts.push(cdHeader);
    centralDirSize += cdHeader.length;
  }

  // End of central directory record (22 bytes)
  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);
  eocdView.setUint32(0, 0x06054b50, true); // EOCD signature
  eocdView.setUint16(4, 0, true); // Disk number
  eocdView.setUint16(6, 0, true); // Start disk
  eocdView.setUint16(8, files.length, true); // Entries on this disk
  eocdView.setUint16(10, files.length, true); // Total entries
  eocdView.setUint32(12, centralDirSize, true); // Central directory size
  eocdView.setUint32(16, centralDirOffset, true); // Central directory offset
  eocdView.setUint16(20, 0, true); // Comment length
  parts.push(eocd);

  const totalLength = parts.reduce((acc, part) => acc + part.length, 0);
  const result = new Uint8Array(totalLength);
  let cur = 0;
  for (const part of parts) {
    result.set(part, cur);
    cur += part.length;
  }
  return result;
}

/**
 * Extracts a clean company name from the cover letter, job description, or company profile
 * to name the file: "[Company Name] - CL.docx".
 */
export function extractCompanyFileName(
  coverLetterText: string,
  jobDescriptionText: string = "",
  companyProfileText: string = ""
): string {
  let company = "";

  // 1. Try companyProfile input first
  if (companyProfileText.trim()) {
    const firstLine = companyProfileText.trim().split("\n")[0].trim();
    const candidate = firstLine.replace(/^company\s*[:\-]\s*/i, "").replace(/\[.*?\]/g, "").trim();
    if (candidate.length >= 2 && candidate.length <= 40) {
      company = candidate;
    }
  }

  // 2. Try parsing from jobDescription
  if (!company && jobDescriptionText.trim()) {
    const match = jobDescriptionText.match(/(?:company|company name|client|employer)\s*[:\-]\s*([^\n\r,]+)/i);
    if (match && match[1]) {
      const candidate = match[1].replace(/\[.*?\]/g, "").trim();
      if (candidate.length >= 2 && candidate.length <= 40) {
        company = candidate;
      }
    }
  }

  // 3. Try parsing from the generated cover letter text (the recipient company block)
  if (!company && coverLetterText.trim()) {
    const lines = coverLetterText
      .replace(/\r\n/g, "\n")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const dateIdx = lines.findIndex((l) => /\b202\d\b/.test(l));
    const dearIdx = lines.findIndex((l) => /^dear\b/i.test(l));

    if (dateIdx !== -1 && dearIdx !== -1 && dearIdx > dateIdx + 1) {
      const recipientLines = lines.slice(dateIdx + 1, dearIdx);
      if (recipientLines.length >= 2) {
        const candidate = recipientLines[1].replace(/\[.*?\]/g, "").trim();
        if (candidate && !/^(jakarta|remote|indonesia|dear|hiring|recruitment)/i.test(candidate)) {
          company = candidate;
        } else if (recipientLines[0] && !/^(hiring|recruitment|dear)/i.test(recipientLines[0])) {
          company = recipientLines[0].replace(/\[.*?\]/g, "").trim();
        }
      } else if (recipientLines.length === 1) {
        const candidate = recipientLines[0].replace(/\[.*?\]/g, "").trim();
        if (!/^(hiring|recruitment|dear)/i.test(candidate)) {
          company = candidate;
        }
      }
    }
  }

  // Sanitize characters invalid in file systems: \ / : * ? " < > |
  if (company) {
    company = company.replace(/[/\\?%*:|"<>]/g, "").trim();
  }

  if (!company || /^(hiring team|company name|remote|n\/a)$/i.test(company)) {
    return "Cover Letter - CL.docx";
  }

  return `${company} - CL.docx`;
}

/**
 * Builds a genuine Word OpenXML .docx Blob directly in JavaScript.
 */
export function generateDocxBlob(coverLetterText: string): Blob {
  const encoder = new TextEncoder();
  const text = coverLetterText.replace(/\r\n/g, "\n").trim();
  const rawParagraphs = text.split(/\n\s*\n/);

  const paragraphsXml = rawParagraphs
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";

      const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);

      // Build runs with <w:br/> between lines within the same paragraph
      const runsXml = lines
        .map((line, idx) => {
          const textRun = `<w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:color w:val="111827"/></w:rPr><w:t xml:space="preserve">${escapeXml(
            line
          )}</w:t></w:r>`;
          if (idx < lines.length - 1) {
            return textRun + `<w:r><w:br/></w:r>`;
          }
          return textRun;
        })
        .join("");

      return `<w:p><w:pPr><w:spacing w:after="200" w:line="276" w:lineRule="auto"/><w:jc w:val="both"/></w:pPr>${runsXml}</w:p>`;
    })
    .filter(Boolean)
    .join("\n");

  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
${paragraphsXml}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`;

  const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

  const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  const docRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`;

  const zipBytes = createZip([
    { name: "[Content_Types].xml", data: encoder.encode(contentTypesXml) },
    { name: "_rels/.rels", data: encoder.encode(relsXml) },
    { name: "word/_rels/document.xml.rels", data: encoder.encode(docRelsXml) },
    { name: "word/document.xml", data: encoder.encode(documentXml) },
  ]);

  return new Blob([zipBytes], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
}
