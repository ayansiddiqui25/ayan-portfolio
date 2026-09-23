import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { visibleProjects } from "../../portfolio-content";
import { ZoomImage } from "../../components/ZoomImage";
import { projectDetails } from "../../project-details";
import { ActionLink } from "../../components/ActionLink";

type Props = { params: Promise<{ slug: string }> };
const origin = "https://pixel-portfolio-fc.sidayan25.chatgpt.site";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = visibleProjects.find(item => item.id === slug);
  if (!project) notFound();
  const images = project.gallery?.length ? [origin + project.gallery[0].src] : [];
  return {
    title: project.name, description: project.description,
    openGraph: { title: project.name, description: project.description, type: "article", url: `${origin}/projects/${slug}`, images },
    twitter: { title: project.name, description: project.description, card: images.length ? "summary_large_image" : "summary", images }
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = visibleProjects.find(item => item.id === slug);
  const story = projectDetails[slug];
  if (!project || !story) notFound();
  const peers = visibleProjects.filter(item => item.category === project.category && item.id !== slug);
  return <main className="case-study page-width">
    <nav className="case-nav" aria-label="Project navigation"><a href="/">Ayan Siddiqui</a><a href={`/#project-${slug}`}>← All projects</a></nav>
    <header className="case-header"><p className="eyebrow">{project.type}</p><h1>{project.name}</h1><p>{project.description}</p>
      <ul className="tags">{project.tech.map(item => <li key={item}>{item}</li>)}</ul>
      {project.link && <ActionLink href={project.link}>{project.linkLabel}</ActionLink>}
    </header>
    <div className="case-layout">
      <nav className="case-index" aria-label="Case study sections">{["Problem", "Solution", "My role", "Outcome"].map(label => <a key={label} href={`#${label.toLowerCase().replace(" ", "-")}`}>{label}</a>)}</nav>
      <div className="case-sections">{([
        ["Problem", story.problem], ["Solution", story.solution], ["My role", story.role], ["Outcome", story.outcome]
      ] as const).map(([label, copy]) => <section id={label.toLowerCase().replace(" ", "-")} key={label}><h2>{label}</h2><p>{copy}</p></section>)}</div>
    </div>
    {project.gallery && <section className="case-media" aria-labelledby="project-images"><h2 id="project-images">Design &amp; drawings</h2><div className="project-gallery">{project.gallery.map(picture => <figure key={picture.src}>
      <ZoomImage {...picture} /><figcaption>{picture.caption}</figcaption>
    </figure>)}</div><p className="case-credit">{slug === "self-parking-car" ? "Team drawings · MEC 322 · Winter 2026" : "System diagram supplied by Ayan · Concept sketch from MEC 325, Milestone 2, Team 0901"}</p></section>}
    {slug === "self-parking-car" && <section className="case-notes"><h2>Engineering decisions</h2><ul className="detail-list">{project.points.slice(2).map(point => <li key={point}>{point}</li>)}</ul></section>}
    <footer className="case-footer"><h2>More {project.category === "software" ? "software" : "hardware"} projects</h2><div>{peers.map(item => <a key={item.id} href={`/projects/${item.id}`}>{item.name}<span aria-hidden="true">↗</span></a>)}</div><ActionLink href="/#projects" variant="secondary">All projects</ActionLink></footer>
  </main>;
}
