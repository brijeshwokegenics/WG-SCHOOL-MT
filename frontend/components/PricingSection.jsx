"use client";

import { PricingCard } from "./PricingCard";

export default function PricingSection() {
  const pricing = [
    {
      plan: "Basic",
      price: "$9/mo",
      features: ["Feature One", "Feature Two", "Feature Three"],
    },
    {
      plan: "Pro",
      price: "$29/mo",
      features: ["Feature One", "Feature Two", "Feature Three", "Feature Four"],
      highlight: true,
    },
    {
      plan: "Enterprise",
      price: "$99/mo",
      features: ["All Features", "Priority Support", "Custom Integrations"],
    },
  ];

  return (
    <section className="py-1  px-4 bg-primary dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Pricing Plans
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricing.map((p, i) => (
          <PricingCard
            key={i}
            plan={p.plan}
            price={p.price}
            features={p.features}
            highlight={p.highlight}
          />
        ))}
      </div>
    </section>
  );
}
