import type { ExperienceItem as ExperienceItemType } from "@/lib/data/experience";

interface ExperienceItemProps {
  item: ExperienceItemType;
}

export default function ExperienceItem({ item }: ExperienceItemProps) {
  return (
    <article className="rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-10 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-[#D1D5DB]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#1F2937]">{item.company}</h2>
          <p className="mt-0.5 text-sm font-medium text-[#6B7280]">{item.role}</p>
        </div>
        <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3.5 py-1 text-xs font-mono text-[#6B7280] shrink-0">
          {item.period}
        </span>
      </div>

      <ul className="mt-6 space-y-3">
        {item.description.map((bullet, i) => (
          <li key={i} className="flex gap-3 text-sm text-[#1F2937] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B7280]" />
            {bullet}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[#F3F4F6]">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1 text-xs font-medium text-[#6B7280]"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
