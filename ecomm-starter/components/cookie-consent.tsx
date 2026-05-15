"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("growthho-cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("growthho-cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-8 right-8 md:left-auto md:max-w-md z-[100] animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-blue-600/20 shadow-2xl shadow-blue-600/10 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 flex-shrink-0">
            <Cookie className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-black tracking-tight text-lg leading-none">Cookie Policy</h3>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              We use cookies to enhance your premium shopping experience and analyze our traffic.
            </p>
          </div>
          <button onClick={() => setIsVisible(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={accept}
            className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20"
          >
            Accept All Cookies
          </Button>
          <div className="flex justify-center">
            <a href="/privacy" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-blue-600 transition-colors">
              Read our Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
