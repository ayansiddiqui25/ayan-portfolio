import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Off the pitch" };

export default function HobbiesPage() {
  redirect("/#about");
}
