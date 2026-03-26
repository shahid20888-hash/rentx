import { SITE_URL } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
  showSchema?: boolean;
};

export function Breadcrumbs({ items, showSchema = true }: BreadcrumbsProps) {
  const lastIndex = items.length - 1;

  const schema =
    showSchema &&
    breadcrumbSchema(
      items.map((item, index) => ({
        name: item.label,
        url: item.href ? `${SITE_URL.replace(/\/$/, "")}${item.href}` : SITE_URL,
        position: index + 1
      }))
    );

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="text-xs text-brand-text/70"
      >
        <ol className="inline-flex flex-wrap items-center gap-1 rounded-full border border-brand-primary/15 bg-brand-surface px-2 py-1">
          {items.map((item, index) => {
            const isLast = index === lastIndex;
            const content = item.href && !isLast ? (
              <a
                href={item.href}
                className="rounded-full px-2 py-1 text-brand-text hover:bg-brand-hover hover:text-brand-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus"
              >
                {item.label}
              </a>
            ) : (
              <span className="px-1.5 py-0.5 text-brand-primary">{item.label}</span>
            );

            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1">
                {index > 0 && <span aria-hidden="true" className="px-0.5 text-brand-text/60">/</span>}
                {content}
              </li>
            );
          })}
        </ol>
      </nav>
      {showSchema && schema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
}


