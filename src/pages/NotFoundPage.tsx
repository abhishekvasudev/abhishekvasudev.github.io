import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="pt-36 pb-20 px-4 md:px-8 max-w-4xl mx-auto text-center">
      <h1 className="font-serif text-6xl md:text-8xl font-light text-gold-400 mb-4">404</h1>
      <h2 className="font-serif text-2xl font-medium text-white mb-6">Page Not Found</h2>
      <p className="text-zinc-400 mb-8 font-light">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-8 py-3 rounded-xl btn-champagne text-xs font-bold uppercase tracking-widest"
      >
        Go Home
      </Link>
    </main>
  );
}
