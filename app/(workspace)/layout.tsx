
// import type { ReactNode } from "react";
// import { Sidebar } from "@/components/layout/sidebar";
// import { Header } from "@/components/layout/header";

// export default function WorkspaceLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   return (
//     <div className="flex min-h-screen bg-[#080b16] text-[#f8fafc]">
//       <Sidebar />

//       <div className="flex min-w-0 flex-1 flex-col">
//         <Header />

//         <main className="flex-1 p-4 sm:p-6 lg:p-8">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }


import type { ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default async function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#080b16] text-[#f8fafc]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
