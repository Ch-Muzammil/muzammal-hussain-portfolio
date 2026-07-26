export function PageLoader({ label = "Loading" }: { label?: string }) {
  return (
    <main
      className="flex flex-1 flex-col items-center justify-center px-6 py-24"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        <span
          className="size-8 animate-spin rounded-full border-2 border-zinc-200 border-t-foreground dark:border-zinc-700 dark:border-t-zinc-100"
          aria-hidden
        />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      </div>
    </main>
  );
}
