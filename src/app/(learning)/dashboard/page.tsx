import type { Metadata } from "next";
import { DashboardJourney } from "@/components/dashboard-journey";
export const metadata: Metadata = { title: "Your learning journey" };
export default function DashboardPage() { return <DashboardJourney />; }
