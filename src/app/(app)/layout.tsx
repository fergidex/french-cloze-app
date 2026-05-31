import NavBar from "@/components/NavBar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="max-w-lg mx-auto px-4 pt-6 pb-nav min-h-screen">
        {children}
      </main>
      <NavBar />
    </>
  );
}
