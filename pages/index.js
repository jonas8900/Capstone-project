import Dashboard from "@/components/Dashboard";
import Votecard from "@/components/Votecard";

export default function HomePage({ dates, setDates }) {
  console.log(dates);
  return (
    <>
      {dates.length > 0 &&
        dates.map((date) => (
          <Votecard key={date.key} dates={dates} setDates={setDates} />
        ))}
      <Dashboard />
    </>
  );
}
