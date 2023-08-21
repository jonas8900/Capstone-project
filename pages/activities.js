import Activitylist from "@/components/Activitylist";

export default function Activities({
  activityCards,
  setActivityCards,
  dates,
  setDates,
}) {
  return (
    <>
      <Activitylist
        activityCards={activityCards}
        setActivityCards={setActivityCards}
        dates={dates}
        setDates={setDates}
      />
    </>
  );
}
