import styled from "styled-components";
import { StyledHeadline } from "./Dashboard";
import Form from "./Form";
import { uid } from "uid";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Activitylist({ activityCards, setActivityCards }) {
  // the defaultValue is connected to the dummyList. This is helpful in the future for the mongoDB connection
  const router = useRouter()

  function handleSubmitActivity(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newActivity = {
      name: data.activityName,
      id: uid(),
    };
    setActivityCards([...activityCards, newActivity]);

    event.target.reset();
  }

  function handleDelete(id) {
    const areYouSureToDelete = window.confirm(
      "Do you really want to delete the activity?"
    );
    if (areYouSureToDelete) {
      setActivityCards(
        activityCards.filter((activityCard) => activityCard.id !== id)
      );
    }
  }

  return (
    <main>
      <StyledHeadline>Friends</StyledHeadline>
      <StyledActivitySection>
        <StyledHeadlineForSubpages>Aktivitäten</StyledHeadlineForSubpages>
        <StyledList>
          {activityCards.map((activity) => (
            <StyledListItem key={activity.id}>
              <StyledListItemHeadline>{activity.name}</StyledListItemHeadline>
              <StyledDeleteButton onClick={() => handleDelete(activity.id)}>
                X
              </StyledDeleteButton>
              <StyledActivityLink href={`/${activity.id}`}>
                <StyledPlanButton>planen</StyledPlanButton>
              </StyledActivityLink>
            </StyledListItem>
          ))}
        </StyledList>
      </StyledActivitySection>
      <Form
        name={"activityName"}
        type={"text"}
        onSubmit={handleSubmitActivity}
        placeholder={"hier aktivität eingeben..."}
      />
    </main>
  );
}

export const StyledList = styled.ul`
  list-style: none;
  margin: 2rem 2rem 2rem 2rem;
  padding: 0;
  text-align: center;
`;

const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: repeat(2, 0.5fr) 2fr 1fr;
  grid-template-rows: repeat(2, 0.8fr);
  grid-auto-flow: column;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-top: 2rem;
  padding: 0;
  border: 1px solid rgba(181, 181, 181, 0.2);
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
  word-break: break-word;
`;

const StyledListItemHeadline = styled.h3`
  grid-area: 1 / 3 / 2 / 4;
  font-size: var(--font-size-headlines);
`;

const StyledActivitySection = styled.section`
  margin: 1rem auto;
  padding-bottom: 2rem;
`;

const StyledHeadlineForSubpages = styled.h2`
  font-size: var(--font-size-headline);
  margin-left: 40px;
  margin-bottom: 0px;
`;

const StyledDeleteButton = styled.button`
  background-color: white;
  border: none;
  width: 30px;
  height: 30px;
  font-size: 1rem;
  grid-area: 1 / 1 / 2 / 2;

  &:active {
    color: var(--secondary-color);
  }
`;

const StyledPlanButton = styled.button`
  width: 50%;
  height: 100%;
  max-height: 2rem;
  justify-self: center;
  align-self: center;
  border-radius: 9px;
  border: none;
  background-color: var(--third-color);

  &:active {
    background-color: #ffe89a;
  }
`;

const StyledActivityLink = styled(Link)`
  grid-area: 2 / 3 / 3 / 4;
`;
