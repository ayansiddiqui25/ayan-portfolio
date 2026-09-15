import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "About me" };

export default function AboutPage() {
  redirect("/#about");
}
