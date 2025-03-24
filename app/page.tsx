"use client"

import { BookOpen, Bookmark, ChevronRight, Settings, Sparkles, Wand2 } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const featuresRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" })
  }


  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10 z-0"></div>
          {mounted && (
            <div className="absolute inset-0 z-0">
              <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"></div>
              <div className="absolute top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"></div>
            </div>
          )}
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
              StoryForge AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
              Unleash your creativity with AI-powered storytelling. Create, manage, and bring your stories to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              <Button size="lg" className="gap-2" onClick={scrollToFeatures}>
                Start Creating <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section ref={featuresRef} className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/create" className="block group">
              <Card className="p-8 h-full border-2 border-transparent hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Wand2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Create Story</h3>
                  <p className="text-muted-foreground">
                    Generate unique stories with AI assistance. Choose genres, characters, and plot elements.
                  </p>
                </div>
              </Card>
            </Link>

            <Link href="/bookmarks" className="block group">
              <Card className="p-8 h-full border-2 border-transparent hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Bookmark className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Library</h3>
                  <p className="text-muted-foreground">
                    Access your saved stories. Organize, edit, and continue where you left off.
                  </p>
                </div>
              </Card>
            </Link>

            <Link href="/read" className="block group">
              <Card className="p-8 h-full border-2 border-transparent hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Reading Mode</h3>
                  <p className="text-muted-foreground">
                    Enjoy your stories distraction-free with customizable reading preferences.
                  </p>
                </div>
              </Card>
            </Link>

            <Link href="/settings" className="block group">
              <Card className="p-8 h-full border-2 border-transparent hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Settings className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Settings</h3>
                  <p className="text-muted-foreground">
                    Customize your experience with themes, AI preferences, and account settings.
                  </p>
                </div>
              </Card>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Story?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of storytellers using StoryForge AI to bring their imagination to life.
            </p>
            <Link href="/create">
              <Button size="lg" className="gap-2">
                Get Started Now <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">StoryForge AI</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} StoryForge AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div >
  )
}

