import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";

import { styled } from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import CreateAndEditForm from "@/components/CreateAndEditForm";
import { StyledBackIcon } from "../[activityPlan]";
import moment from "moment";
import "moment/locale/de";

export default function Addevent({}) {
  const router = useRouter();
  const currentEventId = router.query.editevent;
  const { data, mutate, isLoading } = useSWR("/api/finalEvents");

  const allEvents = data;

  const findEventToEdit =
    allEvents !== undefined &&
    allEvents.find((finalEvent) => finalEvent._id === currentEventId);
  console.log(findEventToEdit);
  if (isLoading) {
    return (
      <StyledLoadingError>
        <StyledLoadingErrorIcon icon={faSpinner} spin />
      </StyledLoadingError>
    );
  }

  async function handleEditEvent(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const editEventData = Object.fromEntries(formData);

    const addEventObject = {
      finalDate: editEventData.finalDate,
      ort: editEventData.ort,
      veranstaltung: editEventData.veranstaltung,
      isInVotingProcess: findEventToEdit.isInVotingProcess,
      parentId: findEventToEdit.parentId,
      products: findEventToEdit.products,
      _id: findEventToEdit._id,
    };
    const areYouSureToDelete = window.confirm(
      "Bist du dir sicher, dass du dieses Event ändern möchtest?"
    );
    if (areYouSureToDelete) {
      const response = await fetch(`/api/finalEvents`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ addEventObject }),
      });

      if (response.ok) {
        mutate();
        alert("Erfolgreich abgeändert!");
        router.push("/veranstaltungen");
        event.target.reset();
      }
    }
  }

  return (
    <main>
      {findEventToEdit !== undefined && (
        <section>
          <StyledSectionForHeadlineAndBackButton>
            <StyledBackButtonLink href={"/veranstaltungen"}>
              <StyledBackIcon icon={faArrowLeft} />
            </StyledBackButtonLink>
            <StyledHeadlineForEvents>
              Veranstaltung {findEventToEdit.veranstaltung} Ändern:
            </StyledHeadlineForEvents>
          </StyledSectionForHeadlineAndBackButton>
          <StyledSectionOldData>
            <StyledParagraphForOldData>
              Ort: {findEventToEdit.ort}
            </StyledParagraphForOldData>
            <StyledParagraphForOldData>
              Datum: {moment(findEventToEdit.finalDate).format("lll")}
            </StyledParagraphForOldData>
          </StyledSectionOldData>
          <CreateAndEditForm onSubmit={handleEditEvent} />
        </section>
      )}
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
