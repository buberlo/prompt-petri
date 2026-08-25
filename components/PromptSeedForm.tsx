'use client';

import { FormEvent, useState } from 'react';

interface PromptSeedFormProps {
  onSeed: (basePrompt: string) => Promise<void> | void;
  loading?: boolean;
  initialPrompt?: string;
}

const EXAMPLE_SEED =
  'Write a concise product description for a reusable water bottle. Keep it friendly, practical, and under 80 words.';

export default function PromptSeedForm({
  onSeed,
  loading = false,
  initialPrompt = '',
}: PromptSeedFormProps) {
  const [value, setValue] = useState(initialPrompt);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const busy = loading || submitting;
  const trimmedLength = value.trim().length;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = value.trim();

    if (!trimmed) {
      setError('Seed a base prompt before mutating.');
      return;
    }

    if (trimmed.length < 10) {
      setError('Give the seed at least 10 characters so mutants have room to evolve.');
      return;
    }

    if (trimmed.length > 2000) {
      setError('Keep the seed under 2000 characters.');
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      await onSeed(trimmed);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUseExample = () => {
    setValue(EXAMPLE_SEED);
    setError(null);
  };

  return (
    <form className="prompt-seed-form" onSubmit={handleSubmit} aria-labelledby="prompt-seed-title">
      <div className="prompt-seed-header">
        <h2 id="prompt-seed-title">Seed prompt</h2>
        <p>
          Enter the base prompt to mutate. Prompt Petri will generate eight variants and score
          tone, length, confidence, and failure signals.
        </p>
      </div>

      <label htmlFor="base-prompt">Base prompt</label>
      <textarea
        id="base-prompt"
        name="basePrompt"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          if (error) setError(null);
        }}
        placeholder={EXAMPLE_SEED}
        rows={6}
        disabled={busy}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'base-prompt-error base-prompt-count' : 'base-prompt-count'}
      />

      <div className="prompt-seed-footer">
        <span id="base-prompt-count" className="prompt-seed-count">
          {trimmedLength} characters
        </span>

        <div className="prompt-seed-actions">
          <button type="button" onClick={handleUseExample} disabled={busy}>
            Use example
          </button>
          <button type="submit" disabled={busy}>
            {busy ? 'Mutating…' : 'Generate 8 mutants'}
          </button>
        </div>
      </div>

      {error ? (
        <p id="base-prompt-error" role="alert" className="prompt-seed-error">
          {error}
        </p>
      ) : null}
    </form>
  );
}