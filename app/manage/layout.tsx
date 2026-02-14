import { getSession } from "@/lib/auth";
import Logo from "@/components/ui/Logo";
import ManageNav from "@/components/manage/ManageNav";
import UserMenu from "@/components/manage/UserMenu";

export const metadata = {
  title: "Manage - Colossem",
};

export default async function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-6 py-4">
          <a href="/">
            <Logo />
          </a>
          {user && (
            <div className="flex items-center gap-6">
              <ManageNav />
              <UserMenu user={user} />
            </div>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-[var(--container-max)] px-6 py-10">
        {children}
      </main>
    </div>
  );
}
