import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">Happy Work Anniversary</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/my-activities">
            <Button variant="ghost" size="sm">
              My Activities
            </Button>
          </Link>
          <Link href="/create">
            <Button size="sm">Create Celebration</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}