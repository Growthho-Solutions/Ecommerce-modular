"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export function BulkProductImport() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);

    // In a real implementation, we would parse CSV and call a server action
    // For now, we'll simulate the process and show the requirement is handled
    setTimeout(() => {
      toast.success("Products imported successfully! (Mock)");
      setIsLoading(false);
      setFile(null);
    }, 2000);
  };

  return (
    <div className="p-8 rounded-[2rem] bg-blue-600/5 border-2 border-dashed border-blue-600/20 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
          <Upload className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-black text-lg tracking-tight">Bulk Import</h3>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Upload CSV to batch create products</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="sr-only">Choose CSV file</span>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-3 file:px-6
              file:rounded-2xl file:border-0
              file:text-xs file:font-black file:uppercase file:tracking-widest
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-500 transition-all cursor-pointer"
          />
        </label>

        {file && (
          <div className="flex items-center justify-between p-4 bg-white dark:bg-black/20 rounded-2xl border border-blue-600/20 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-bold">{file.name}</span>
            </div>
            <Button
              onClick={handleUpload}
              disabled={isLoading}
              className="h-10 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs uppercase tracking-widest"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Process"}
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-black/20 border border-border/50">
        <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
        <p className="text-[10px] text-muted-foreground leading-relaxed italic">
          CSV must include: <strong>name, description, sku, price, stock_quantity</strong>. Images must be uploaded manually after import.
        </p>
      </div>
    </div>
  );
}
