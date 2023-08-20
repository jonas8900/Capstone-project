import styled from "styled-components";

export default function DashboardCard() {
  return (
    <StyledSection>
      <StyledHeadline2>Nächste Aktivität</StyledHeadline2>
      <StyledUl>
        <li>
          <StyledHeadline3>Aktivitäten</StyledHeadline3>
          <StyledDetailText>Filme Abend</StyledDetailText>
        </li>
        <li>
          <StyledHeadline3>Datum</StyledHeadline3>
          <StyledDetailText>21.01.2023</StyledDetailText>
        </li>
        <li>
          <StyledHeadline3>Ort</StyledHeadline3>
          <StyledDetailText>Max Zuhause</StyledDetailText>
        </li>
        <li>
          <StyledHeadline3>was bringst du mit</StyledHeadline3>
          <StyledDetailText>Popcorn</StyledDetailText>
          <StyledDetailText>Eistee</StyledDetailText>
        </li>
      </StyledUl>
    </StyledSection>
  );
}

export const StyledHeadline2 = styled.h2`
  font-size: var(--font-size-headline);
  color: var(--secondary-color);
  margin-left: 40px;
  margin-bottom: 0px;
`;

const StyledHeadline3 = styled.h3`
  font-size: var(--font-size-details);
  color: var(--grey-topics);
  font-weight: var(--font-weight-light);
`;

const StyledDetailText = styled.p`
  font-size: var(--font-size-details);
  margin-top: -10px;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  margin-top: 4rem;
  margin-bottom: 6rem;
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;
