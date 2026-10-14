import { PrimaryButton } from "@/components/primary-button";

export default function NotFound() {
  return <main id="main-content" className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-5 p-6"><p className="eyebrow">Page not found</p><h1 className="text-3xl font-bold">Find your way back</h1><p className="text-sm text-muted-foreground">Your learning journey is still here.</p><PrimaryButton href="/dashboard">Back to Home</PrimaryButton></main>;
}
