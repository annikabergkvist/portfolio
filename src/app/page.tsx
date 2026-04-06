import { Button } from "@/components/ui/button";
import { ProjectRow, type Project } from "@/components/project-row";
import { MAIN_CONTENT_CLASS } from "@/lib/main-content";
import { cn } from "@/lib/utils";

const projects: Project[] = [
  {
    index: "01",
    title: "Fintech Dashboard UI",
    description:
      "A Wise-inspired dashboard redesigned and built from scratch. Custom design system with light and dark mode.",
    role: "Role — Design Engineer",
  },
  {
    index: "02",
    title: "Leader Linné Småland",
    description:
      "Complete redesign and development of a regional NGO homepage. UX research, design and frontend development.",
    role: "Role — UX Designer & Frontend Developer",
  },
  {
    index: "03",
    title: "Wexiödisk",
    description:
      "Designed and tested an online savings calculator page, focusing on user interaction and usability.",
    role: "Role — UX Designer",
  },
  {
    index: "04",
    title: "VDFF Website Redesign",
    description:
      "Frontend development and testing for Växjö DFF, ensuring a responsive and high-performance website.",
    role: "Role — Frontend Developer",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero — one h1 per page */}
      <section className="flex min-h-[85dvh] items-center justify-center lg:justify-start">
        <div
          className={cn(
            MAIN_CONTENT_CLASS,
            "flex w-full justify-center lg:justify-start",
          )}
        >
          <div className="flex max-w-3xl flex-col gap-6 text-center lg:text-left">
            <p className="text-sm font-medium uppercase tracking-widest text-sidebar-accent-foreground">
              Annika Bergkvist
            </p>
            <div className="flex flex-col gap-1">
              <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Design Engineer
              </h1>
              <p className="text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                + UX/UI Design
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work — h2 for section; each project title is h3 inside ProjectRow */}
      <section id="work" className="flex flex-col">
        <h2 className="sr-only">Selected work</h2>
        {projects.map((project) => (
          <ProjectRow key={project.title} {...project} />
        ))}
      </section>

      {/* About */}
      <section id="about">
        <div
          className={cn(
            MAIN_CONTENT_CLASS,
            "grid grid-cols-1 items-center gap-8 py-16 sm:py-20 lg:min-h-screen lg:grid-cols-2 lg:gap-16 lg:py-24",
          )}
        >
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-black leading-tight text-foreground sm:text-4xl">
              About me
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Design Engineer based in Kristianstad, Sweden. Bridging product design
              and frontend development — turning ideas into polished,
              production-ready interfaces.
            </p>
            <Button type="button" variant="default" size="pill">
              Get in touch <span aria-hidden>→</span>
            </Button>
          </div>
          <div className="flex aspect-square items-center justify-center rounded-lg bg-card">
            <p className="text-sm text-muted-foreground">Photo</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="flex min-h-[40vh] flex-col lg:min-h-[50vh]"
      >
        <div
          className={cn(
            MAIN_CONTENT_CLASS,
            "flex flex-1 flex-col items-center justify-center gap-4 py-16 lg:py-24",
          )}
        >
          <h2 className="text-2xl font-black text-foreground sm:text-3xl">
            Contact
          </h2>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Coming soon
          </p>
        </div>
      </section>
    </main>
  );
}
