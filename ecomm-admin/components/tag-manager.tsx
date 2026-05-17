"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Tag as TagIcon,
  Trash2,
  Search,
  Hash
} from "lucide-react";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

interface Tag {
  id: string;
  name: string;
  store_id: string;
}

export function TagManager({ initialTags, storeId }: { initialTags: Tag[], storeId: string }) {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [newTagName, setNewTagName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    setIsAdding(true);
    try {
      const { data, error } = await supabase
        .from("tags")
        .insert({ name: newTagName.trim(), store_id: storeId })
        .select()
        .single();

      if (error) throw error;

      setTags([...tags, data].sort((a, b) => a.name.localeCompare(b.name)));
      setNewTagName("");
      toast.success("Tag created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to create tag");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteTag = async (id: string) => {
    try {
      const { error } = await supabase
        .from("tags")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setTags(tags.filter(tag => tag.id !== id));
      toast.success("Tag deleted");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete tag");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form onSubmit={handleAddTag} className="flex gap-2">
          <div className="relative flex-1">
            <Plus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Add new tag (e.g. Summer Collection)"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className="pl-10 h-12 rounded-2xl bg-white dark:bg-[#12141c] border-border/50"
              disabled={isAdding}
            />
          </div>
          <Button
            type="submit"
            disabled={isAdding || !newTagName.trim()}
            className="h-12 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20"
          >
            {isAdding ? "Adding..." : "Add Tag"}
          </Button>
        </form>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-2xl bg-white dark:bg-[#12141c] border-border/50"
          />
        </div>
      </div>

      <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm min-h-[300px]">
        {filteredTags.length === 0 ? (
          <div className="h-[200px] flex flex-col items-center justify-center text-center opacity-40">
            <TagIcon className="h-12 w-12 mb-4" />
            <p className="text-lg font-medium">No tags found</p>
            <p className="text-sm">Create your first tag above to start organizing.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTags.map((tag) => (
              <div
                key={tag.id}
                className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#12141c] flex items-center justify-center border border-border/50 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Hash className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-sm tracking-tight">{tag.name}</span>
                </div>
                <button
                  onClick={() => handleDeleteTag(tag.id)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete tag"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
