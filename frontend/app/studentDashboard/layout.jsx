import Sidebar from "@/components/Sidebar";

export default function PrincipalLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 border-l-[1px] border-l-gray-300 dark:border-l-gray-600">
        {children}
      </main>
    </div>
  );
}