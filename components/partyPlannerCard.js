import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Link from "next/link";
import { styled } from "styled-components";
import "moment/locale/de";
import Form from "./Form";
import { useRouter } from "next/router";
import { uid } from "uid";
import useSWR from "swr";

export default function PartyPlannerCard({}) {
  const router = useRouter();
  const { data: finalEvent, mutate } = useSWR(
    `/api/planner/${router.query.partyPlanner}`
  );
  const userID = "Marvin-818924";
  console.log("test:", finalEvent);

  const onclickedEvent = finalEvent;

  async function handleSubmitPlanning(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productInput = Object.fromEntries(formData);
    const typedProducts = {
      userID: userID,
      product: productInput.product,
    };

    const response = await fetch(`/api/planner/${router.query.partyPlanner}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ typedProducts }),
    });

    if (response.ok) {
      mutate();
      event.target.reset();
    }
  }
  return (
    <main>
      {onclickedEvent === undefined && (
        <section>
          <h2>dieses Event existiert nicht...</h2>
          <p>zurück zu den Events:</p>
          <StyledBackLink href={"/veranstaltungen"}>
            <StyledBackIcon icon={faArrowLeft} />
          </StyledBackLink>
        </section>
      )}
      {onclickedEvent && (
        <section>
          <StyledBackLink href={"/veranstaltungen"}>
            <StyledBackIcon icon={faArrowLeft} />
          </StyledBackLink>
          <h2>Party Planer</h2>

          <StyledThirdEventHeadline>
            anstehende Aktivitäten:
          </StyledThirdEventHeadline>

          <StyledPlannerSectionWrapper>
            <StyledFormCardWrapper key={onclickedEvent._id}>
              <StyledShowActivityWrapper>
                <StyledFourthHeadline>Aktivität:</StyledFourthHeadline>
                <StyledParagraphForDetails>
                  {onclickedEvent.veranstaltung}
                </StyledParagraphForDetails>
              </StyledShowActivityWrapper>
              <StyledShowLocationWrapper>
                <StyledFourthHeadline>Ort:</StyledFourthHeadline>
                <StyledParagraphForDetails>
                  {onclickedEvent.ort}
                </StyledParagraphForDetails>
              </StyledShowLocationWrapper>
              <StyledShowDateWrapper>
                <StyledFourthHeadline>Datum:</StyledFourthHeadline>
                <StyledParagraphForDetails>
                  {" "}
                  {moment(onclickedEvent.finalDate).format("lll")}
                </StyledParagraphForDetails>
              </StyledShowDateWrapper>
            </StyledFormCardWrapper>

            <StyledThirdEventHeadline>Wer holt was:</StyledThirdEventHeadline>
            <StyledDisplayFormArticle>
              <StyledFourthHeadline>Name</StyledFourthHeadline>

              <StyledFourthHeadline2>nimmt mit</StyledFourthHeadline2>
              <StyledUlForNames>
                {onclickedEvent.products &&
                  onclickedEvent.products.map((product) => (
                    <StyledListItemArticle key={product._id}>
                      <StyledListItemUserID>
                        {product.userID}
                      </StyledListItemUserID>
                      <StyledListItemProduct>
                        {product.product}
                      </StyledListItemProduct>
                    </StyledListItemArticle>
                  ))}
              </StyledUlForNames>
            </StyledDisplayFormArticle>
          </StyledPlannerSectionWrapper>
          <Form
            name={"product"}
            type={"text"}
            onSubmit={handleSubmitPlanning}
            placeholder={"hier aktivität eingeben..."}
          />
        </section>
      )}
    </main>
  );
}

const StyledThirdEventHeadline = styled.h3`
  font-size: 15px;
  margin: 2rem;
  font-weight: normal;
`;

const StyledBackLink = styled(Link)`
  justify-content: left;
  color: black;
  width: 2rem;
  height: 2rem;
`;

const StyledBackIcon = styled(FontAwesomeIcon)`
  width: 2rem;
  height: 2rem;
`;

const StyledPlannerSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  margin-top: 0px;
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
`;

const StyledFormCardWrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-left: 1rem;
  border-bottom: 1px solid var(--grey-topics);
`;

const StyledShowActivityWrapper = styled.article`
  grid-area: 1 / 1 / 2 / 2;
`;

const StyledShowLocationWrapper = styled.article`
  grid-area: 1 / 2 / 2 / 3;
`;

const StyledShowDateWrapper = styled.article`
  grid-area: 2 / 1 / 3 / 2;
`;

const StyledFourthHeadline = styled.h4`
  font-size: var(--font-size-details);
  color: var(--grey-topics);
  grid-area: 1 / 1 / 2 / 2;
`;

const StyledFourthHeadline2 = styled.h4`
  font-size: var(--font-size-details);
  color: var(--grey-topics);
  grid-area: 1 / 2 / 2 / 3;
`;

const StyledParagraphForDetails = styled.p`
  font-size: var(--font-size-details);
`;

const StyledDisplayFormArticle = styled.article`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 0.2fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-left: 1rem;
`;

const StyledUlForNames = styled.ul`
  grid-area: 2 / 1 / 3 / 3;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;
`;

const StyledListItemArticle = styled.article`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 0.3fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const StyledListItemUserID = styled.li`
  grid-area: 1 / 1 / 2 / 2;
`;
const StyledListItemProduct = styled.li`
  grid-area: 1 / 2 / 2 / 3;
`;
