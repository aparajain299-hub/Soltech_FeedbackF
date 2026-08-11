import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitFeedback } from "@/lib/feedback.functions";

type FeedbackFormProps = {
  onSuccess: () => void;
};

export function FeedbackForm({ onSuccess }: FeedbackFormProps) {
  const send = useServerFn(submitFeedback);
  const [overall, setOverall] = useState(0);
  const [service, setService] = useState(0);
  const [written, setWritten] = useState("");
  const [validation, setValidation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!overall || !service) {
      setValidation("Please tap a star for both ratings before submitting.");
      return;
    }
    setValidation(null);
    setSubmitting(true);
    try {
      await send({
        data: {
          overall_rating: overall,
          service_rating: service,
          written_feedback: written.trim() || undefined,
        },
      });
      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">
      <fieldset className="space-y-3">
        <legend className="text-[0.95rem] font-medium text-foreground">
          How was your overall experience with Soltech Energy?
        </legend>
        <StarRating
          label="Overall experience rating"
          name="overall_rating"
          value={overall}
          onChange={(v) => {
            setOverall(v);
            setValidation(null);
          }}
          invalid={Boolean(validation) && !overall}
        />
      </fieldset>

      <div className="h-px bg-border" />

      <fieldset className="space-y-3">
        <legend className="text-[0.95rem] font-medium text-foreground">
          Rate the quality of our service
        </legend>
        <StarRating
          label="Service quality rating"
          name="service_rating"
          value={service}
          onChange={(v) => {
            setService(v);
            setValidation(null);
          }}
          invalid={Boolean(validation) && !service}
        />
      </fieldset>

      <div className="h-px bg-border" />

      <div className="space-y-3">
        <label htmlFor="written_feedback" className="block text-[0.95rem] font-medium">
          Share your experience{" "}
          <span className="font-normal text-muted-foreground">(Optional)</span>
        </label>
        <Textarea
          id="written_feedback"
          name="written_feedback"
          value={written}
          onChange={(e) => setWritten(e.target.value)}
          placeholder="Write your feedback..."
          maxLength={2000}
          rows={4}
          className="resize-none rounded-xl border-border bg-secondary/40 text-base shadow-none focus-visible:ring-ring"
        />
      </div>

      {validation ? (
        <p role="alert" className="rounded-xl bg-accent-soft px-4 py-3 text-sm text-accent-foreground">
          {validation}
        </p>
      ) : null}

      {error ? (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={submitting}
        className="h-13 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-colors hover:bg-primary/90"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          "Submit Feedback"
        )}
      </Button>
    </form>
  );
}
