export function FeedbackSuccess() {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-accent-soft text-3xl">
        <img
          src="soltech-logo.png"
          alt="Soltech Energy"
          className="size-10 object-contain"
        />
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-foreground">Thank you! </h2>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        Your feedback helps us serve you better.
      </p>
    </div>
  );
}
