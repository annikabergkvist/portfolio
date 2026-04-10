import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { ProjectMockup } from "@/components/project-mockup";
import { MAIN_CONTENT_CLASS } from "@/lib/main-content";
import { PROJECT_SLUGS, getProjectBySlug, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/** Phrases that start a case-study paragraph when followed by body text. */
const CASE_STUDY_SECTION_HEADINGS = new Set([
  "The problem",
  "What I did",
  "The result",
]);

type PageProps = {
  params: Promise<{ slug: string }>;
};

type CaseStudyBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "lead"; label: string; body: string };

function buildCaseStudyBlocks(paragraphs: string[]): CaseStudyBlock[] {
  const blocks: CaseStudyBlock[] = [];
  for (let i = 0; i < paragraphs.length; i++) {
    const trimmed = paragraphs[i].trim();
    const next = paragraphs[i + 1]?.trim() ?? "";
    if (CASE_STUDY_SECTION_HEADINGS.has(trimmed) && next.length > 0) {
      blocks.push({ kind: "lead", label: trimmed, body: next });
      i += 1;
    } else {
      blocks.push({ kind: "paragraph", text: paragraphs[i] });
    }
  }
  return blocks;
}

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project" };
  }
  const headline = project.subtitle
    ? `${project.title} — ${project.subtitle}`
    : project.title;
  return {
    title: `${headline} — Annika Bergkvist`,
    description: project.description,
  };
}

function ProjectHeroIntro({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      <div className="flex flex-col gap-3 sm:gap-4">
        <span className="text-sm font-semibold text-primary">{project.index}</span>
        <h1 className="text-balance text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.02]">
          {project.title}
        </h1>
        {project.subtitle ? (
          <p className="text-balance text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl lg:text-[2rem] lg:leading-tight">
            {project.subtitle}
          </p>
        ) : null}
      </div>

      <div className="flex max-w-xl flex-col gap-5 sm:gap-6">
        <p className="text-pretty text-base font-medium leading-relaxed text-secondary-foreground sm:text-lg sm:leading-relaxed">
          {project.description}
        </p>
        <p className="text-pretty text-sm font-medium leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
          {project.role}
        </p>
      </div>
    </div>
  );
}

function CaseStudyBody({
  paragraphs,
  liveUrl,
}: {
  paragraphs: string[];
  liveUrl?: string;
}) {
  const blocks = buildCaseStudyBlocks(paragraphs);
  const bodyClass =
    "text-[17px] font-medium leading-relaxed text-secondary-foreground sm:text-[18px] sm:leading-[1.65]";

  return (
    <div className="flex min-w-0 max-w-[65ch] flex-col gap-6 lg:max-w-[min(100%,52ch)]">
      {blocks.map((block, i) => {
        if (block.kind === "lead") {
          return (
            <p key={`lead-${i}`} className={bodyClass}>
              <span className="font-bold text-foreground">{block.label}</span> {block.body}
            </p>
          );
        }
        return (
          <p key={`p-${i}`} className={bodyClass}>
            {block.text}
          </p>
        );
      })}
      {liveUrl ? (
        <p className={bodyClass}>
          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-baseline gap-0.5 font-semibold text-primary underline decoration-primary/40 underline-offset-[0.2em] transition-colors hover:text-primary/90 hover:decoration-primary"
          >
            <ChevronRight
              className="relative top-[0.12em] inline size-4 shrink-0 transition-transform group-hover:translate-x-0.5 sm:size-[1.125rem]"
              strokeWidth={2.5}
              aria-hidden
            />
            <span>View website</span>
          </Link>
        </p>
      ) : null}
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const paragraphs = project.fullDescription.split("\n\n");
  const mockupAlt = project.subtitle
    ? `${project.title} — ${project.subtitle} mockup`
    : `${project.title} mockup`;

  return (
    <main className="flex min-w-0 flex-col pb-24 pt-12 sm:pb-28 sm:pt-14 lg:pt-16">
      <div className={cn(MAIN_CONTENT_CLASS, "flex flex-col gap-16 sm:gap-20 lg:gap-24")}>
        <ProjectHeroIntro project={project} />

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:items-start lg:gap-x-20 xl:gap-x-28 2xl:gap-x-36">
          <CaseStudyBody paragraphs={paragraphs} liveUrl={project.liveUrl} />

          <div className="min-w-0 overflow-visible lg:-mt-[min(28vh,13rem)] lg:sticky lg:top-28 lg:self-start xl:-mt-[min(32vh,15rem)] xl:top-24">
            <ProjectMockup
              src={project.mockupSrc}
              alt={mockupAlt}
              floatDurationMs={project.floatDurationMs}
              floatDelayMs={project.floatDelayMs}
              className="mx-0 w-full !max-w-none pb-0 sm:pb-0"
            />
          </div>
        </div>

        <p className="border-t border-border pt-12 sm:pt-14">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-base font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            <ArrowLeft className="size-4 shrink-0" strokeWidth={2.5} aria-hidden />
            Back to work
          </Link>
        </p>
      </div>
    </main>
  );
}
