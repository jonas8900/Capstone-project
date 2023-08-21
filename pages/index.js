import Dashboard from "@/components/Dashboard";
import Votecard from "@/components/Votecard";

export default function HomePage({ dates, setDates }) {
  return (
    <>
      {dates.length > 0 && <Votecard dates={dates} setDates={setDates} />}
      <Dashboard />
    </>
  );
}
