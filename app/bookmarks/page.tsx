"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GENRES, Story } from "@/lib/types";
import { getStories, deleteStory } from "@/lib/storage";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

export default function BookmarksPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const userId = useAuth().user?.uid;

  useEffect(() => {
    if (!userId) return;
    const fetchStories = async () => {
      setStories(await getStories(userId));
    };
    fetchStories();
  }, [userId]);

  const handleDelete = async (id: string) => {
    if (!userId) return;
    deleteStory(id, userId);
    setStories(await getStories(userId));
  };

  const filteredStories = selectedGenre === "all"
    ? stories
    : stories.filter((story) => story.genre === selectedGenre);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Stories</h1>
        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {GENRES.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredStories.length > 0 && filteredStories.map((story) => (
          <Card key={story.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {new Date(story.createdAt).toLocaleDateString()} · {story.genre}
                </p>
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleDelete(story.id)}
                >
                  Delete
                </Button>
                <Link href={`/read?id=${story.id}`}>
                  <Button>Read</Button>
                </Link>
              </div>
            </div>
            <p className="line-clamp-3">{story.content}</p>
          </Card>
        ))}

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No stories found</p>
            <Link href="/create">
              <Button>Create Your First Story</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}