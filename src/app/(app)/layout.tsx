import NavBar from "@/components/NavBar";
import UserMenu from "@/components/UserMenu";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="max-w-lg mx-auto px-4 pt-3 flex justify-end">
        <UserMenu />
      </div>
      <main className="max-w-lg mx-auto px-4 pt-3 pb-nav min-h-screen">
        {children}
      </main>
      <NavBar />
    </>
  );
}
