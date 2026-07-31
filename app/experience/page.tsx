import type { Metadata } from "next";
import { ContentPage } from "../components/ContentPage";
import { pages } from "../portfolio-data";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return <ContentPage data={pages.experience} />;
}
