import type { Metadata } from "next";
import { ContentPage } from "../components/ContentPage";
import { pages } from "../portfolio-data";

export const metadata: Metadata = { title: "About me" };

export default function AboutPage() {
  return <ContentPage data={pages.about} />;
}
