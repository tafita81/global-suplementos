import { TopNavigation } from "./TopNavigation";

interface PublicSiteLayoutProps {
  children: React.ReactNode;
}

export function PublicSiteLayout({ children }: PublicSiteLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}