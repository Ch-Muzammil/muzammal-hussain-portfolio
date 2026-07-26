import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Base App
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to continue
        </p>
      </div>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
