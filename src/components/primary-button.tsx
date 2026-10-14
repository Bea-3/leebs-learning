import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrimaryButton({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return <Button asChild className={className}><Link href={href}>{children}<ArrowRight aria-hidden="true" /></Link></Button>;
}
