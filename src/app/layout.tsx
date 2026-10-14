import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Leebs — Make it make sense", template: "%s | Leebs" },
  description: "Small steps. Deeper understanding. Make JAMB Biology concepts clearer with Leebs.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#faf8f2", viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-NG"><body className="antialiased"><a href="#main-content" className="fixed left-4 top-4 z-50 -translate-y-24 rounded-xl bg-primary px-4 py-3 text-primary-foreground focus:translate-y-0">Skip to content</a>{children}</body></html>;
}
