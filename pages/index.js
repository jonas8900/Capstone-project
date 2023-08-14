import Dashboard from "@/components/Dashboard";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Dashboard />
      <Link href={"/Subpages/Activities"}>Go to Activities</Link>
    </>
  );
}
