import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/router";
import styled from "styled-components";

import CreateAndEditForm from "@/components/CreateAndEditForm";
import moment from "moment";
import "moment/locale/de";
import Link from "next/link";

import BackButtonWithHeadLine from "@/components/BackButtonWithHeadline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
export default function Addevent({}) {
  // const [currentId, setCurrentId] = useState();
  const { data: session } = useSession();
  const sessionTrue = session && true;
  const router = useRouter();
  const currentEventId = router.query.editevent;
  const [finalEvent, setFinalEvent] = useState([]);
  const requestBody = {
    currentEventId: currentEventId,
    sessionData: session && session.user,
  };

  function getActivitySuggestions() {
    if (session) {
      fetch(`/api/getorupdateevent/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }).then((promisedActivityData) => {
        promisedActivityData.json().then((finalActivityData) => {
          setFinalEvent([finalActivityData]);
        });
      });
    }
  }
  useEffect(() => {
    getActivitySuggestions();
  }, [sessionTrue]);

  const findEventToEdit =
    finalEvent !== undefined &&
    finalEvent.find((finalEvent) => finalEvent._id === currentEventId);

  async function handleEditEvent(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const editEventData = Object.fromEntries(formData);

    const addEventObject = {
      finalDate: editEventData.finalDate,
      ort: editEventData.ort,
      name: editEventData.veranstaltung,
      isInVotingProcess: findEventToEdit.isInVotingProcess,
      activitySuggestionId: findEventToEdit.parentId,
      products: findEventToEdit.products,
      _id: findEventToEdit._id,
    };
    const areYouSureToDelete = window.confirm(
      "Bist du dir sicher, dass du dieses Event ändern möchtest?"
    );
    if (areYouSureToDelete) {
      await fetch(`/api/getorupdateevent`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addEventObject),
      });
      alert("Erfolgreich abgeändert!");
      router.push("/eventcollection");
      event.target.reset();
    }
  }

  return (
    <main>
      {findEventToEdit !== undefined && (
        <section>
          <BackButtonWithHeadLine href={"/eventcollection"} icon={faArrowLeft}>
            Veranstaltung <u>`{findEventToEdit.name}`</u> Ändern:
          </BackButtonWithHeadLine>
          <StyledSectionOldData>
            <StyledParagraphForOldData>
              Ort: {findEventToEdit.ort}
            </StyledParagraphForOldData>
            <StyledParagraphForOldData>
              Datum: {moment(findEventToEdit.finalDate).format("lll")}
            </StyledParagraphForOldData>
          </StyledSectionOldData>
          <CreateAndEditForm
            onSubmit={handleEditEvent}
            valueVeranstaltung={findEventToEdit.name}
            valueOrt={findEventToEdit.ort}
          />
        </section>
      )}
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

const StyledSectionOldData = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const StyledParagraphForOldData = styled.p`
  font-size: var(--font-size-details);
  color: var(--grey-topics);
`;
