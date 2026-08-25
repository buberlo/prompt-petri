import type { Metadata } from "next";

import Playground from "@/components/Playground";

export const metadata: Metadata = {
  title: "Prompt Petri",
  description:
    "Seed a base prompt, generate eight mutated variants, evaluate them in A/B batches, and compost failures into trait suggestions.",
};

export default function Home() {
  return (
    <main className="page">
      <header className="page-header">
        <div className="page-title">
          <h1>Prompt Petri</h1>
          <p>
            An AI prompt evolution playground for seeding, mutating, comparing,
            evaluating, and composting prompts.
          </p>
        </div>
      </header>

      <section className="playground" aria-label="Prompt Petri playground">
        <Playground />
      </section>
    </main>
  );
}