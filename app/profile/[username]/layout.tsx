export const metadata = {
  title: "Profile - mlbb.fyi",
  description: "Your mlbb.fyi Profile ",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-[1280px] overflow-hidden xl:mx-auto">
      {children}
    </main>
  );
}
