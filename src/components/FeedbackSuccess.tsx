export function FeedbackSuccess() {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center sm:px-8">
      <h2 className="text-2xl font-semibold text-foreground">Thank you!</h2>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        Your response has been recorded. Your feedback helps us serve you better.
      </p>
    </div>
  );
}
