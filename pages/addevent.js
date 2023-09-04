import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { StyledBackIcon } from "./[activityPlan]";
import { StyledHeadlineForSubpages } from "@/components/Activitylist";
import { styled } from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import CreateAndEditForm from "@/components/CreateAndEditForm";

export default function Addevent({}) {
  const router = useRouter();
  const { mutate, isLoading } = useSWR("api/finalEvents");

  if (isLoading) {
    return (
      <StyledLoadingError>
        <StyledLoadingErrorIcon icon={faSpinner} spin />
      </StyledLoadingError>
    );
  }

  async function handleSubmitAddEvent(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const addEventData = Object.fromEntries(formData);

    const addEventObject = {
      finalDate: addEventData.finalDate,
      isInVotingProcess: false,
      ort: addEventData.ort,
      parentId: "newCreated",
      products: [],
      veranstaltung: addEventData.veranstaltung,
    };
    const response = await fetch("api/finalEvents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addEventObject),
    });

    if (response.ok) {
      mutate();
    }
    alert("Du hast eine neues Event hinzugefügt!");
    router.push("/eventcollection");
    event.target.reset();
  }

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
      <CreateAndEditForm onSubmit={handleSubmitAddEvent}  />
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
