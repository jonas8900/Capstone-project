import { activityList } from "@/dummyList/activityList";
import styled from "styled-components";
import { StyledHeadline } from "./Dashboard";
import Form from "./Form";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

export default function Activitylist() {
  // the defaultValue is connected to the dummyList. This is helpful in the future for the mongoDB connection
  const [activityCards, setActivityCards] = useLocalStorageState(
    "activityList",
    {
      defaultValue: activityList,
    }
  );

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

  return (
      <main>
        <StyledHeadline>Friends</StyledHeadline>
        <StyledActivitySection>
          <StyledHeadlineForSubpages>Aktivitäten</StyledHeadlineForSubpages>
          <StyledList>
          {activityCards.map((activity) => (
              <StyledListItem key={activity.id}>
                <StyledListItemHeadline>{activity.name}</StyledListItemHeadline>
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

const StyledList = styled.ul`
  list-style: none;
  margin: 2rem 2rem 2rem 2rem;
  padding: 0;
  text-align: center;
`;

const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: repeat(2, 0.5fr) 2fr 1fr;
  grid-template-rows: repeat(2, 0.8fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-top: 2rem;
  padding: 0;
  border: 1px solid rgba(181, 181, 181, 0.2);
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
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
