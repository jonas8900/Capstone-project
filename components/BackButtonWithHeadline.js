import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { styled } from "styled-components";

export default function BackButtonWithHeadLine({ children, href, icon }) {
  return (
    <StyledSectionForHeadlineAndBackButton>
      <StyledBackButtonLink href={href}>
        <StyledBackIcon icon={icon} />
      </StyledBackButtonLink>
      <StyledHeadlineForEvents>{children}</StyledHeadlineForEvents>
    </StyledSectionForHeadlineAndBackButton>
  );
}

const StyledSectionForHeadlineAndBackButton = styled.section`
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  color: var(--primary-color);
`;

const StyledBackButtonLink = styled(Link)`
  color: black;
  width: 100%;
  height: 2rem;
  margin-top: 0;
  grid-area: 1 / 1 / 2 / 2;

  &:active {
    color: var(--secondary-color);
  }
`;

const StyledBackIcon = styled(FontAwesomeIcon)`
  width: 2rem;
  height: 2rem;
`;

const StyledHeadlineForEvents = styled.h2`
  font-size: var(--font-size-headline);
  grid-area: 1 / 2 / 2 / 3;
  margin: auto;
`;
