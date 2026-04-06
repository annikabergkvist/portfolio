import { Button } from "@/components/ui/button";
import { MAIN_CONTENT_CLASS } from "@/lib/main-content";
import { SITE_MAILTO } from "@/lib/site-nav";
import { cn } from "@/lib/utils";

export type Project = {
  index: string;
  title: string;
  description: string;
  role: string;
};

const gridClass =
  "grid grid-cols-1 items-center gap-8 py-16 sm:py-20 lg:min-h-screen lg:grid-cols-2 lg:gap-16 lg:py-24";

export function ProjectRow({
  index,
  title,
  description,
  role,
}: Project) {
  const projectMailto = `${SITE_MAILTO}?subject=${encodeURIComponent(`Project inquiry: ${title}`)}`;

  return (
    <div className={cn(MAIN_CONTENT_CLASS, gridClass)}>
      <div className="flex flex-col gap-6">
        <span className="text-sm tracking-widest text-muted-foreground">
          {index}
        </span>
        <h3 className="text-3xl font-black leading-tight text-foreground sm:text-4xl">
          {title}
        </h3>
        <p className="text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
        <p className="text-sm text-muted-foreground">{role}</p>
        <Button variant="default" size="pill" asChild>
          <a href={projectMailto}>
            View project <span aria-hidden>→</span>
          </a>
        </Button>
      </div>
      <div className="flex aspect-video items-center justify-center rounded-lg bg-card">
        <p className="text-sm text-muted-foreground">Project image</p>
      </div>
    </div>
  );
}
