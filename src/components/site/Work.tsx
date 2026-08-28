import { useReveal } from "@/lib/reveal";
import { siteContent } from "@/lib/content/site";

export function Work() {
  const ref = useReveal<HTMLElement>();
  const projects = siteContent.projects;

  return (
    <section ref={ref} id="work" className="panel mt-3 p-8 sm:p-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 data-reveal className="display text-[clamp(2rem,4.5vw,3.5rem)]">
          {projects.title}
        </h2>
        <p data-reveal className="text-sm text-muted-foreground">
          {projects.subtitle}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
        {projects.items.map((p) => (
          <article key={p.title} data-reveal className="group">
            <div className="overflow-hidden rounded-2xl bg-secondary">
              <img
                src={p.imageFolder}
                alt={p.alt}
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-4/3 w-full object-cover transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
              <span className="text-sm text-muted-foreground">{p.year}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{p.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
