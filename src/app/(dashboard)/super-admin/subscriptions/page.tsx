"use client";

import { PageHeader, KPICard } from "@/components/ui/kpi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { subscriptionPlans } from "@/data/mock";
import { CreditCard, Users, HardDrive } from "lucide-react";

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Subscription Plans" description="Manage SaaS subscription tiers" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan, i) => (
          <Card key={plan.id} className={`p-6 ${i === 1 ? "ring-2 ring-brand-blue" : ""}`}>
            {i === 1 && <span className="text-xs font-semibold text-brand-blue mb-2 block">Most Popular</span>}
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="text-3xl font-bold mt-2">${plan.price}<span className="text-sm font-normal text-text-secondary">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li className="flex items-center gap-2"><Users className="h-4 w-4" /> Up to {plan.users} users</li>
              <li className="flex items-center gap-2"><HardDrive className="h-4 w-4" /> {plan.storage} storage</li>
              <li className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> {plan.companies} active companies</li>
            </ul>
            <Button className="w-full mt-6" variant={i === 1 ? "primary" : "outline"}>Edit Plan</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
