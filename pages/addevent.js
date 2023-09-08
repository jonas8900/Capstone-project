import BackButtonWithHeadLine from "@/components/BackButtonWithHeadline";
import CreateAndEditForm from "@/components/CreateAndEditForm";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
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
    await fetch("api/createfinaleventanddeletevoting", {
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

const StyledBackButtonLink = styled(Link)`
  color: black;
  width: 100%;
  height: 2rem;
  margin-top: 0;
  grid-area: 1 / 1 / 2 / 2;

  &:active {
    background-color: var(--secondary-color);
  }
`;

const StyledSectionForHeadlineAndBackButton = styled.section`
  display: grid;
  grid-template-columns: 0.25fr 1fr 0.25fr;
  grid-template-rows: 0.5fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const StyledHeadlineForEvents = styled.h2`
  font-size: var(--font-size-headline);
  margin-left: 40px;
  grid-area: 1 / 2 / 2 / 3;
  align-content: center;
`;
