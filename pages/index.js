import Dashboard from "@/components/Dashboard";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Dashboard />
      <Link href={"/activities"}>Go to Activities</Link>
    </>
  );
}
