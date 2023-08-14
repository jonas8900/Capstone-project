import { activityList } from "@/dummyList/activityList";
import { styled } from "styled-components";
import { StyledHeadline } from "./Dashboard";

export default function Activitylist() {
  return (
    <>
      <StyledHeadline>Friends</StyledHeadline>
      <StyledActivitySection>
        <StyledHeadlineForSubpages>Aktivitäten</StyledHeadlineForSubpages>
        {activityList.map((activity) => (
          <StyledList key={activity.id}>
            <StyledListItem>
              <StyledListItemHeadline>{activity.name}</StyledListItemHeadline>
            </StyledListItem>
          </StyledList>
        ))}
      </StyledActivitySection>
    </>
  );
}

const StyledList = styled.ul`
  list-style: none;
  margin: 2rem 2rem 2rem 2rem;
  padding: 0;
  text-align: center;
  border: 1px solid rgba(181, 181, 181, 0.2);
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
`;

const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: repeat(2, 0.5fr) 2fr 1fr;
  grid-template-rows: repeat(2, 0.8fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const StyledListItemHeadline = styled.h3`
  grid-area: 1 / 3 / 2 / 4;
  font-size: var(--font-size-headlines);
`;

const StyledActivitySection = styled.section`
  margin: 1rem auto;
`;

const StyledHeadlineForSubpages = styled.h2`
  font-size: var(--font-size-headline);
  margin-left: 40px;
  margin-bottom: 0px;
`