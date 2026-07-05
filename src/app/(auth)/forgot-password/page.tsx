"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-bg-main">
      <div className="w-full max-w-md">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl gradient-brand flex items-center justify-center">
            <span className="text-white font-bold text-sm">360</span>
          </div>
          <h1 className="text-xl font-bold text-text-primary">360 WorkFlow</h1>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="h-16 w-16 rounded-2xl bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary">Check your email</h2>
            <p className="text-text-secondary mt-2">
              We&apos;ve sent a password reset link to <strong>{email}</strong>
            </p>
            <Link href="/reset-password">
              <Button className="mt-6">Reset Password</Button>
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-text-primary">Forgot password?</h2>
            <p className="text-text-secondary mt-1 mb-8">
              Enter your email and we&apos;ll send you a reset link
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
              <Button type="submit" className="w-full gradient-sidebar-active border-0" size="lg">
                Send Reset Link
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
