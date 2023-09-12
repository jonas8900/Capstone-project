import BackButtonWithHeadLine from "@/components/BackButtonWithHeadline";
import CreateAndEditForm from "@/components/CreateAndEditForm";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";

import { uid } from "uid";

export default function Addevent({}) {
  const router = useRouter();
  const { data: session } = useSession();

  async function handleSubmitAddEvent(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const addEventData = Object.fromEntries(formData);

    const addEventObject = {
      finalDate: addEventData.finalDate,
      name: addEventData.veranstaltung,
      isInVotingProcess: false,
      ort: addEventData.ort,
      activitySuggestionId: uid(),
      products: [],
      userSessionData: session.user,
    };
    await fetch("api/events/createfinaleventanddeletevoting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addEventObject),
    });
    alert("Du hast eine neues Event hinzugefügt!");
    router.push("/eventcollection");
    event.target.reset();
  }

  return (
    <main>
      <BackButtonWithHeadLine href={"eventcollection"} icon={faArrowLeft}>
        Veranstaltung hinzufügen:
      </BackButtonWithHeadLine>{" "}
      <CreateAndEditForm onSubmit={handleSubmitAddEvent} />
    </main>
  );
}
