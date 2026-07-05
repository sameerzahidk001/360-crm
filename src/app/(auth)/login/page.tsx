"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Shield, User, Heart, Globe, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/app-store";
import { findUserByEmail, getDashboardRoute, loginAccounts } from "@/lib/auth";
import { cn } from "@/lib/utils";

const roleIcons = {
  company_admin: Shield,
  manager: User,
  employee: User,
  hr: Heart,
  super_admin: Globe,
  client: Handshake,
};

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAppStore((s) => s.setUser);
  const addToast = useAppStore((s) => s.addToast);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (loginEmail?: string, loginPassword?: string) => {
    const e = loginEmail ?? email;
    const p = loginPassword ?? password;
    setLoading(true);

    const user = findUserByEmail(e);
    const account = loginAccounts.find((a) => a.email.toLowerCase() === e.trim().toLowerCase());

    setTimeout(() => {
      if (!user || (account && p !== account.password && p !== "password")) {
        addToast({ title: "Invalid credentials", message: "Use demo accounts below or password: password", type: "error" });
        setLoading(false);
        return;
      }
      setUser(user);
      addToast({ title: `Welcome, ${user.name.split(" ")[0]}!`, type: "success" });
      router.push(getDashboardRoute(user.role));
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left — matches 360techsolution.com black + orange */}
      <div className="hidden lg:flex lg:w-[48%] bg-black relative overflow-hidden">
        <div className="absolute inset-0 agency-pattern" />
        <div className="absolute bottom-16 left-12 h-20 w-20 rounded-full bg-accent-orange opacity-90" />
        <div className="absolute top-1/3 right-16 h-32 w-32 rounded-full border-2 border-accent-orange/40" />
        <div className="absolute top-20 right-32 h-4 w-4 rounded-full bg-accent-orange" />

        <div className="relative z-10 flex flex-col justify-center px-14 text-white">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center">
              <span className="font-black text-black text-lg">360</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                360<span className="text-accent-orange">tech</span>solution
              </h1>
              <p className="text-white/50 text-xs mt-0.5">WorkFlow Platform</p>
            </div>
          </div>

          <p className="text-accent-orange text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Emerging Global IT Service Provider
          </p>
          <h2 className="text-4xl font-bold leading-tight mb-5 text-white">
            Transforming Business<br />Through IT Services
          </h2>
          <p className="text-white/60 text-base max-w-md leading-relaxed">
            Simple project management, HR, and team productivity — built for software houses and digital agencies.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-3 max-w-sm">
            {[
              { label: "Active Projects", value: "8+" },
              { label: "Team Members", value: "74+" },
              { label: "Tasks Done", value: "500+" },
              { label: "Client Trust", value: "1K+" },
            ].map((stat) => (
              <div key={stat.label} className="border border-white/10 rounded-xl p-4 bg-white/5">
                <p className="text-2xl font-bold text-accent-orange">{stat.value}</p>
                <p className="text-white/50 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — clean white form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white overflow-y-auto">
        <div className="w-full max-w-lg py-8">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
              <span className="text-white font-bold text-sm">360</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-black">360 WorkFlow</h1>
              <p className="text-xs text-text-secondary">360 Tech Solution</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-black">Sign in</h2>
          <p className="text-text-secondary mt-1 mb-6">Choose your role below or enter credentials</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
            {loginAccounts.map((account) => {
              const Icon = roleIcons[account.role];
              return (
                <button
                  key={account.role}
                  type="button"
                  onClick={() => handleLogin(account.email, account.password)}
                  disabled={loading}
                  className={cn(
                    "p-3 rounded-xl border border-border bg-white text-left transition-all",
                    "hover:border-accent-orange hover:shadow-md hover:bg-accent-orange/5"
                  )}
                >
                  <Icon className="h-4 w-4 text-accent-orange mb-2" />
                  <p className="text-xs font-bold text-black">{account.label}</p>
                  <p className="text-[10px] text-text-secondary mt-0.5 line-clamp-2">{account.description}</p>
                </button>
              );
            })}
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-text-secondary">or sign in with email</span></div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
            <div className="relative">
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
              <Mail className="absolute right-3 top-[38px] h-4 w-4 text-text-secondary" />
            </div>
            <div className="relative">
              <Input label="Password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] text-text-secondary">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-text-secondary">
                <input type="checkbox" className="rounded border-border accent-[#F58220]" defaultChecked /> Remember me
              </label>
              <Link href="/forgot-password" className="text-sm text-accent-orange hover:underline font-medium">Forgot password?</Link>
            </div>
            <Button type="submit" className="w-full btn-primary rounded-lg" size="lg" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-xs text-text-secondary mt-6">
            Demo password for all accounts: <strong className="text-black">password</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
