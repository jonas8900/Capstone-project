import {
  faArrowLeft,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Link from "next/link";
import { styled } from "styled-components";
import "moment/locale/de";
import Form from "./Form";
import { useRouter } from "next/router";
import useSWR from "swr";
import { uid } from "uid";
import { useSession } from "next-auth/react";
import BackButtonWithHeadLine from "./BackButtonWithHeadline";

export default function PartyPlannerCard({}) {
  const router = useRouter();
  const {
    data: finalEvent,
    mutate,
    isLoading,
  } = useSWR(`/api/planner/${router.query.partyPlanner}`);
  const { data: session } = useSession();
  const userID = session && session.user.name;
  if (isLoading) {
    return (
      <StyledLoadingError>
        <StyledLoadingErrorIcon icon={faSpinner} spin />
      </StyledLoadingError>
    );
  }

  const onclickedEvent = finalEvent;

  async function handleSubmitPlanning(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productInput = Object.fromEntries(formData);
    const typedProducts = {
      userID: userID,
      product: productInput.product,
      productId: uid(),
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

  async function handleDelete(id) {
    const areYouSureToDelete = window.confirm(
      "Bist du dir sicher, dass du diese Aktivität löschen möchtest?"
    );
    if (areYouSureToDelete) {
      const response = await fetch(
        `/api/planner/${router.query.partyPlanner}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      if (response.ok) {
        mutate();
      }
    }
  }

  return (
    <>
      {session && (
        <StyledMain>
          {onclickedEvent === undefined && (
            <section>
              <h2>dieses Event existiert nicht...</h2>
              <p>zurück zu den Events:</p>
              <BackButtonWithHeadLine
                href={"/eventcollection"}
                icon={faArrowLeft}
              >
                zurück zu den Events:
              </BackButtonWithHeadLine>
            </section>
          )}
          {onclickedEvent && (
            <section>
              <BackButtonWithHeadLine
                href={"/eventcollection"}
                icon={faArrowLeft}
              >
                Party Planer
              </BackButtonWithHeadLine>

              <StyledThirdEventHeadline>
                anstehende Aktivitäten:
              </StyledThirdEventHeadline>

              <StyledPlannerSectionWrapper>
                <StyledFormCardWrapper key={onclickedEvent._id}>
                  <StyledShowActivityWrapper>
                    <StyledFourthHeadline>Aktivität:</StyledFourthHeadline>
                    <StyledParagraphForDetails>
                      {onclickedEvent.name}
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

                <StyledThirdEventHeadline>
                  Wer holt was:
                </StyledThirdEventHeadline>
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
                          <StyledDeleteProductButton
                            onClick={() => handleDelete(product.productId)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </StyledDeleteProductButton>
                        </StyledListItemArticle>
                      ))}
                  </StyledUlForNames>
                </StyledDisplayFormArticle>
              </StyledPlannerSectionWrapper>
              <Form
                name={"product"}
                type={"text"}
                onSubmit={handleSubmitPlanning}
                placeholder={"Was bringst du mit..."}
              />
            </section>
          )}
        </StyledMain>
      )}
    </>
  );
}

const StyledThirdEventHeadline = styled.h3`
  font-size: 15px;
  text-align: center;
  font-weight: normal;
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

const StyledPlannerSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  margin-top: 0px;
  border-radius: 9px;
  margin-bottom: 10rem;
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
  grid-template-columns: 1fr 0.8fr 0.25fr;
  grid-template-rows: 0.5fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const StyledListItemUserID = styled.li`
  grid-area: 1 / 1 / 2 / 2;
`;
const StyledListItemProduct = styled.li`
  grid-area: 1 / 2 / 2 / 3;
`;
const StyledDeleteProductButton = styled.button`
  grid-area: 1 / 3 / 2 / 4;
  background-color: white;
  border: none;
`;

const StyledMain = styled.main``;
