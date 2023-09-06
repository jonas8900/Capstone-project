import styled from "styled-components";
import "moment/locale/de";
import moment from "moment";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashboardCard({}) {
  //voteDoneArray sorted the array by date, so we can get access for the next activity:
  const { data: session } = useSession();
  const userID = session && session.user.name;
  const [finaleDates, setFinalDates] = useState([]);
  const sessionTrue = session && true;

  function getActivitySuggestions() {
    if (session) {
      fetch("api/getallfinalevents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session.user),
      }).then((promisedActivityData) => {
        promisedActivityData.json().then((finalVoteData) => {
          setFinalDates(finalVoteData);
        });
      });
    }
  }
  useEffect(() => {
    getActivitySuggestions();
  }, [sessionTrue]);

  console.log(finaleDates);
  function compareDatesToSort(a, b) {
    if (a.finalDate < b.finalDate) {
      return -1;
    }
    if (a.finaleDate > b.finalDate) {
      return 1;
    } else {
      return 0;
    }
  }
  const nextActivity = finaleDates !== undefined && finaleDates[0];

  const productsOfNextActivity =
    nextActivity !== undefined && nextActivity.products;

  if (finaleDates !== undefined) {
    finaleDates.sort(compareDatesToSort);
  }
  return (
    <StyledSection>
      <StyledHeadline2>Nächste Aktivität</StyledHeadline2>
      {finaleDates != undefined && finaleDates.length <= 0 && (
        <StyledUl>
          <li>
            <StyledHeadline3>Sieht leer aus...</StyledHeadline3>
            <br />
            <StyledDetailText>
              Starte ein Event um das nächste Event zu sehen!
            </StyledDetailText>
          </li>
        </StyledUl>
      )}
      {finaleDates != undefined && finaleDates.length > 0 && (
        <StyledSectionForUlAndLink>
          <StyledUl>
            <li>
              <StyledHeadline3>Aktivitäten</StyledHeadline3>
              <StyledDetailText>{nextActivity.name}</StyledDetailText>
            </li>
            <li>
              <StyledHeadline3>Datum</StyledHeadline3>
              <StyledDetailText>
                {moment(nextActivity.finalDate).format("lll")}
              </StyledDetailText>
            </li>
            <li>
              <StyledHeadline3>Ort</StyledHeadline3>
              <StyledDetailText>{nextActivity.ort}</StyledDetailText>
            </li>
            <li>
              <StyledHeadline3>Was bringst du mit</StyledHeadline3>
              {productsOfNextActivity.map(
                (product) =>
                  product.userID === userID && (
                    <StyledDetailText key={product._id}>
                      {product.product}
                    </StyledDetailText>
                  )
              )}
            </li>
          </StyledUl>
          <StyledIconLink href={`/planner/${nextActivity._id}`}>
            <StyledCheckListIcon icon={faListCheck} />
          </StyledIconLink>
        </StyledSectionForUlAndLink>
      )}
    </StyledSection>
  );
}

export const StyledHeadline2 = styled.h2`
  font-size: var(--font-size-headline);
  color: var(--secondary-color);
`;

export const StyledHeadline3 = styled.h3`
  font-size: var(--font-size-details);
  color: var(--grey-topics);
  font-weight: var(--font-weight-light);
`;

export const StyledDetailText = styled.p`
  font-size: var(--font-size-details);
  margin-top: -10px;
`;

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  margin-top: 1rem;
  margin-bottom: 6rem;
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
`;

export const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

const StyledIconLink = styled(Link)`
  align-self: flex-start;
  margin: auto 1rem 1rem auto;
`;

const StyledCheckListIcon = styled(FontAwesomeIcon)`
  width: 2rem;
  height: 2rem;
  color: var(--grey-topics);
`;

const StyledSectionForUlAndLink = styled.section`
  display: flex;
`;

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
