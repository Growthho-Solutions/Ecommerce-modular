"use client";

import { useState } from "react";
import { uploadProductImage } from "@/lib/storage-utils";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  X, 
  Image as ImageIcon, 
  Upload,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  storeId: string;
  productId: string;
  onImagesChange: (urls: string[]) => void;
  initialImages?: string[];
}

export function ImageUploader({ 
  storeId, 
  productId, 
  onImagesChange, 
  initialImages = [] 
}: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUrls: string[] = [...images];

    try {
      for (let i = 0; i < files.length; i++) {
        const url = await uploadProductImage(storeId, productId, files[i]);
        if (url) {
          newUrls.push(url);
        }
      }
      setImages(newUrls);
      onImagesChange(newUrls);
      toast.success("Images uploaded!");
    } catch (error) {
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-[1.5rem] overflow-hidden border border-border group">
            <img src={url} alt={`Product ${index}`} className="w-full h-full object-cover" />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1.5 rounded-xl bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
            >
              <X className="h-4 w-4" />
            </button>
            {index === 0 && (
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-blue-600 text-[10px] font-bold text-white uppercase tracking-widest">
                Main
              </div>
            )}
          </div>
        ))}

        <label className={cn(
          "aspect-square rounded-[1.5rem] border-2 border-dashed border-border/50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group",
          isUploading && "pointer-events-none opacity-50"
        )}>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileUpload}
          />
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Plus className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Add Image</span>
            </>
          )}
        </label>
      </div>
      
      {images.length === 0 && !isUploading && (
        <div className="p-8 rounded-[1.5rem] bg-slate-50/50 dark:bg-white/5 border border-border/30 text-center">
          <ImageIcon className="h-8 w-8 mx-auto mb-3 opacity-20" />
          <p className="text-xs text-muted-foreground">No images uploaded yet. The first image will be used as the thumbnail.</p>
        </div>
      )}
    </div>
  );
}
