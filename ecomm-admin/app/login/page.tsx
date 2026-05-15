import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0c10]">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full max-w-md px-6 py-12">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
            <span className="text-2xl font-black text-white tracking-tighter">G.</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Growthho Admin</h1>
          <p className="text-muted-foreground">Sign in to manage your e-commerce ecosystem</p>
        </div>

        <div className="glass-card p-1 rounded-[2rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="bg-[#12141c]/80 rounded-[1.8rem] p-8">
            <LoginForm />
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          &copy; 2026 Growthho Solutions. All rights reserved.
        </p>
      </div>
    </div>
  );
}
