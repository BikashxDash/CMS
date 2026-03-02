export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 py-4 text-sm text-neutral-500 dark:text-neutral-400 text-center">
        © {new Date().getFullYear()} College Name. All rights reserved.
      </div>
    </footer>
  );
}