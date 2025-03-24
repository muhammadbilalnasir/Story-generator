"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Story } from "@/lib/types";
import { getStory, getSettings, updateSettings } from "@/lib/storage";
import { Moon, Sun } from "lucide-react";

export default function ReadPage() {
  const searchParams = useSearchParams();
  const storyId = searchParams.get("id");
  const [story, setStory] = useState<Story | null>(null);
  const [settings, setSettings] = useState(getSettings());

  useEffect(() => {
    if (storyId) {
      const foundStory = getStory(storyId);
      if (foundStory) setStory(foundStory);
    }
  }, [storyId]);

  const toggleDarkMode = () => {
    const newSettings = {
      ...settings,
      darkMode: !settings.darkMode,
    };
    setSettings(newSettings);
    updateSettings(newSettings);
    document.documentElement.classList.toggle("dark");
  };

  const getFontSize = () => {
    switch (settings.readingFontSize) {
      case "small":
        return "text-sm";
      case "large":
        return "text-xl";
      default:
        return "text-base";
    }
  };

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Story not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{story.title}</h1>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {settings.darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <Card className="p-8">
          <div className={`prose max-w-none dark:prose-invert ${getFontSize()}`}>
            <pre className="whitespace-pre-wrap font-sans">{story.content}</pre>
          </div>
        </Card>
      </div>
    </div>
  );
}