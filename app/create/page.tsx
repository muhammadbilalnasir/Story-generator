"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GENRES, Story } from "@/lib/types";
import { saveStory } from "@/lib/storage";
import { Wand2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function CreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [genre, setGenre] = useState<string>(GENRES[0]);
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const userId = useAuth().user?.uid;

  const generateStory = async () => {
    setGenerating(true);
    setTimeout(() => {
      const mockStory = `Once upon a time in a ${genre} world...\n\n${prompt}\n\nThis is a generated story based on your prompt. In a real implementation, this would use an AI model to generate the content.`;
      setGeneratedContent(mockStory);
      setGenerating(false);
    }, 2000);
  };

  const handleSave = () => {
    if (!title || !generatedContent) return;

    const story: Story = {
      id: crypto.randomUUID(),
      title,
      content: generatedContent,
      genre,
      createdAt: new Date().toISOString(),
    };

    saveStory(story, userId!);
    router.push("/bookmarks");
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-4">
        <Wand2 className="h-10 w-10" />
        Create New Story
      </h1>

      <Card className="p-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter story title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Genre</label>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GENRES.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prompt</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your story prompt..."
              rows={4}
            />
          </div>

          <Button
            onClick={generateStory}
            disabled={!prompt || generating}
            className="w-full"
          >
            {generating ? "Generating..." : "Generate Story"}
          </Button>
        </div>
      </Card>

      {generatedContent && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Story</h2>
          <div className="prose max-w-none mb-6">
            <pre className="whitespace-pre-wrap font-sans">{generatedContent}</pre>
          </div>
          <Button onClick={handleSave} className="w-full">
            Save Story
          </Button>
        </Card>
      )}
    </div>
  );
}