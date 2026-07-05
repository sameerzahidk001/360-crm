"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/app-store";

export default function ResetPasswordPage() {
  const router = useRouter();
  const addToast = useAppStore((s) => s.addToast);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      addToast({ title: "Passwords don't match", type: "error" });
      return;
    }
    addToast({ title: "Password updated", message: "You can now sign in with your new password.", type: "success" });
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-bg-main">
      <div className="w-full max-w-md">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to login
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl gradient-brand flex items-center justify-center">
            <span className="text-white font-bold text-sm">360</span>
          </div>
          <h1 className="text-xl font-bold text-text-primary">360 WorkFlow</h1>
        </div>
        <div className="h-12 w-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4">
          <Lock className="h-6 w-6 text-brand-blue" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">Reset your password</h2>
        <p className="text-text-secondary mt-1 mb-8">Enter your new password below</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" required />
          <Input label="Confirm Password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Re-enter password" required />
          <Button type="submit" className="w-full gradient-sidebar-active border-0" size="lg">Update Password</Button>
        </form>
      </div>
    </div>
  );
}
