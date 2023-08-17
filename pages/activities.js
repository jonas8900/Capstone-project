import Activitylist from "@/components/Activitylist";

export default function Activities({ activityCards, setActivityCards }) {
  return (
    <>
      <Activitylist
        activityCards={activityCards}
        setActivityCards={setActivityCards}
      />
    </>
  );
}
