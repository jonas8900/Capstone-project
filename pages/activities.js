import Activitylist from "@/components/Activitylist";
import Link from "next/link";

export default function Activities() {
  return (
    <>
  <Activitylist />
  <Link href={"/"}>Go to the Dashboard</Link>
  </>
  );
}
