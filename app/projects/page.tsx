import type { Metadata } from "next";
import { ContentPage } from "../components/ContentPage";
import { pages } from "../portfolio-data";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return <ContentPage data={pages.projects} />;
}
