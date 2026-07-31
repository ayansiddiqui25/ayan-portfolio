import type { Metadata } from "next";
import { ContentPage } from "../components/ContentPage";
import { pages } from "../portfolio-data";

export const metadata: Metadata = { title: "Off the pitch" };

export default function HobbiesPage() {
  return <ContentPage data={pages.hobbies} />;
}
