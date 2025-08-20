"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">Happy Work Anniversary</span>
          </Link>
        </div>
        
        {/* 移动端菜单按钮 */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* 桌面端导航 */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/my-activities">
            <Button variant="ghost" size="sm">
              My Activities
            </Button>
          </Link>
          <Link href="/faq">
            <Button variant="ghost" size="sm">
              FAQ
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" size="sm">
              About
            </Button>
          </Link>
          <Link href="/create">
            <Button size="sm">Create Celebration</Button>
          </Link>
        </nav>
      </div>

      {/* 移动端下拉菜单 */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 flex flex-col space-y-3">
            <Link href="/my-activities" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                My Activities
              </Button>
            </Link>
            <Link href="/faq" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                FAQ
              </Button>
            </Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                About
              </Button>
            </Link>
            <Link href="/create" onClick={() => setIsMenuOpen(false)}>
              <Button size="sm" className="w-full">Create Celebration</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
