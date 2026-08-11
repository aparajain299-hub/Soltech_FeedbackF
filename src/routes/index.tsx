import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import logoAsset from "@/assets/soltech-logo.png.asset.json";
import { FeedbackForm } from "@/components/FeedbackForm";
import { FeedbackSuccess } from "@/components/FeedbackSuccess";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Customer Feedback — Soltech Energy" },
      {
        name: "description",
        content:
          "Share your Soltech Energy experience in under 30 seconds. Rate our service and tell us how we did.",
      },
      { property: "og:title", content: "Customer Feedback — Soltech Energy" },
      {
        property: "og:description",
        content: "Your experience matters to us. Rate your Soltech Energy experience.",
      },
    ],
  }),
  component: FeedbackPage,
});

function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8 sm:py-14">
      <section className="w-full max-w-md">
        <div className="card-elevated overflow-hidden">
          <header className="flex flex-col items-center border-b border-border px-6 pt-8 pb-6 text-center sm:px-8">
            <img
              src={logoAsset.url}
              alt="Soltech Energy"
              width={512}
              height={512}
              className="size-14 object-contain"
            />
            <h1 className="mt-4 text-2xl font-semibold text-foreground">Customer Feedback</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">Your experience matters to us.</p>
          </header>

          {submitted ? (
            <FeedbackSuccess />
          ) : (
            <div className="px-6 py-7 sm:px-8">
              <FeedbackForm onSuccess={() => setSubmitted(true)} />
            </div>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Soltech Energy · Powering homes with clean solar
        </p>
      </section>
    </main>
  );
}
