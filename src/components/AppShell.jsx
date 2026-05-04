export default function AppShell({ children, compact = false }) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[430px] bg-rock-paper shadow-2xl">
      <section className={`relative min-h-screen w-full overflow-hidden ${compact ? "" : "pb-24"}`}>
        {children}
      </section>
    </main>
  );
}
