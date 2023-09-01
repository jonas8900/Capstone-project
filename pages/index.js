import Dashboard from "@/components/Dashboard";
import Votecard from "@/components/Votecard";
import useSWR from "swr";

export default function HomePage({ dates, setDates, voteDoneArray }) {
  const { data: listOfAllVotesInProgress } = useSWR("api/voteForActivityDate");

  return (
    <>
      {listOfAllVotesInProgress !== undefined && (
        <Votecard dates={dates} setDates={setDates} />
      )}
      <Dashboard voteDoneArray={voteDoneArray} dates={dates} />
    </>
  );
}
