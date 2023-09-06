import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { StyledBackIcon } from "./[activityPlan]";
import { StyledHeadlineForSubpages } from "@/components/Activitylist";
import { styled } from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import CreateAndEditForm from "@/components/CreateAndEditForm";
import { uid } from "uid";
import { useSession } from "next-auth/react";

export default function Addevent({}) {
  const router = useRouter();
  const { data: session } = useSession();
  const userID = session && session.user.email;

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

  // async function handleSubmitFinalDate(event) {
  //   event.preventDefault();

  //   const formData = new FormData(event.target);
  //   const selectData = Object.fromEntries(formData);

  //   const areYouSureToDelete = window.confirm(
  //     "Überprüfe die Eingabe bevor du ein Finales Datum setzt!"
  //   );
  //   if (areYouSureToDelete) {
  //     const finalEventObject = {
  //       userSessionData: session.user,
  //       finalDate: selectData.dateSelect,
  //       name: objectWithTheSameID.name,
  //       ort: objectWithTheSameID.ort,
  //       isInVotingProcess: false,
  //       activitySuggestionId: objectWithTheSameID.activitySuggestionId,
  //     };

  //     await fetch("api/createfinaleventanddeletevoting", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(finalEventObject),
  //     });
  return (
    <main>
      <StyledSectionForHeadlineAndBackButton>
        <StyledBackButtonLink href={"/eventcollection"}>
          <StyledBackIcon icon={faArrowLeft} />
        </StyledBackButtonLink>
        <StyledHeadlineForEvents>
          Veranstaltung hinzufügen:
        </StyledHeadlineForEvents>
      </StyledSectionForHeadlineAndBackButton>
      <CreateAndEditForm onSubmit={handleSubmitAddEvent} />
    </main>
  );
}

const StyledLoadingErrorIcon = styled(FontAwesomeIcon)`
  width: 4rem;
  height: 4rem;
`;

const StyledLoadingError = styled.h1`
  margin-top: 32vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
