import PartyPlannerCard from "@/components/partyPlannerCard";

export default function PartyPlanner({ dates, setDates }) {
  return (
    <>
      <PartyPlannerCard dates={dates} setDates={setDates} />
    </>
  );
}
