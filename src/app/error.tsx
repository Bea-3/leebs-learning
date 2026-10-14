"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main id="main-content" className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-5 p-6"><h1 className="text-3xl font-bold">Let’s try that again</h1><p className="text-sm leading-6 text-muted-foreground">This page couldn’t load. If you’ve lost your connection, reconnect and try again. Offline access is coming in a later phase.</p><Button onClick={reset}>Try again</Button></main>;
}
