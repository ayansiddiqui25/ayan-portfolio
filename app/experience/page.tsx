import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  redirect("/#experience");
}
