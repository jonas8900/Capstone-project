import { StyledHeadlineForSubpages } from "@/components/Activitylist";
import {
  StyledDetailText,
  StyledHeadline2,
  StyledHeadline3,
  StyledSection,
  StyledUl,
} from "@/components/DashboardActivityCard";
import moment from "moment";
import "moment/locale/de";

export default function Events({  voteDoneArray }) {

  return (
    <>
      <StyledHeadlineForSubpages>Events</StyledHeadlineForSubpages>
      {voteDoneArray.map((date) => (
        <StyledSection key={date.finalDateID}>
          <StyledHeadline2>
            Veranstaltung {date.objectWithTheSameID.veranstaltung}
          </StyledHeadline2>
          <StyledUl>
            <li>
              <StyledHeadline3>Veranstaltung:</StyledHeadline3>
              <StyledDetailText>
                {date.objectWithTheSameID.veranstaltung}
              </StyledDetailText>
            </li>
            <li>
              <StyledHeadline3>Datum der Veranstaltung:</StyledHeadline3>
              <StyledDetailText>
                {moment(date.finalDate).format("lll")}
              </StyledDetailText>
            </li>
            <li>
              <StyledHeadline3>Ort der Veranstaltung:</StyledHeadline3>
              <StyledDetailText>
                {date.objectWithTheSameID.ort}
              </StyledDetailText>
            </li>
          </StyledUl>
        </StyledSection>
      ))}
    </>
  );
}
