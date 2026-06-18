import Link from "next/link";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <main className="honeycomb-bg flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="mb-6 animate-float text-6xl">🐝</span>
      <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.3em] text-honey">
        {title}
      </p>
      <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight text-white md:text-7xl">
        Coming Soon
      </h1>
      <p className="mt-5 max-w-md text-white/65">
        We&apos;re busy as bees building this page. Check back soon!
      </p>
      <Link
        href="/"
        className="mt-9 rounded-full border border-honey/40 px-8 py-3 font-display text-sm font-bold uppercase tracking-wide text-honey transition hover:bg-honey hover:text-ink"
      >
        ← Back Home
      </Link>
    </main>
  );
}
