// app/principal/layout.jsx
import Sidebar from "@/components/Sidebar";

export default function PrincipalLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-6">
        {children}
      </main>
    </div>
  );
}
