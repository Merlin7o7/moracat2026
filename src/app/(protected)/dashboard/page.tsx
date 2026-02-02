import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardContent } from "@/components/sections/DashboardContent";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return <DashboardContent user={session.user} />;
}
