import Dashboard from "@/components/Dashboard";
import Votecard from "@/components/Votecard";

export default function HomePage({ dates, setDates, voteDoneArray }) {
  return (
    <>
      {dates.length > 0 && <Votecard dates={dates} setDates={setDates} />}
      <Dashboard voteDoneArray={voteDoneArray} dates={dates} />
    </>
  );
}
