import DashboardActivityCard from "./DashboardActivityCard";

export default function Dashboard({ dates, voteDoneArray }) {
  return (
    <>
      <DashboardActivityCard dates={dates} voteDoneArray={voteDoneArray} />
    </>
  );
}
