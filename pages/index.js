import Dashboard from "@/components/Dashboard";
import Votecard from "@/components/Votecard";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

export default function HomePage({}) {
  const { data: session } = useSession();
  const [votes, setVotes] = useState([]);
  const [randomPicture, setRandomPicture] = useState();

  const sessionTrue = session && true;

  function getSingleUserByMail() {
    if (session) {
      const requestBody = {
        user: session.user,
      };

      fetch("api/cloudinary/getupdateordeletegroupdetailswithpictures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }).then((promisedGroupData) => {
        promisedGroupData.json().then((finalGroupData) => {
          getRandomizedPic(finalGroupData);
        });
      });
    }
  }

  function getRandomizedPic(finalGroupData) {
    if (session) {
      const pictureList = finalGroupData.groupPictures.length;
      const randomNumber = Math.floor(Math.random() * pictureList);
      const changeableRandomPicture =
        finalGroupData.groupPictures[randomNumber];
      setRandomPicture(changeableRandomPicture);
    }
  }

  function getActivitySuggestions() {
    if (session) {
      fetch("api/votes/getallvotingstovote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session.user),
      }).then((promisedActivityData) => {
        promisedActivityData.json().then((finalVoteData) => {
          setVotes(finalVoteData);
        });
      });
    }
  }
  useEffect(() => {
    getSingleUserByMail();
    getActivitySuggestions();
  }, [sessionTrue]);

  return (
    <>
      {sessionTrue ? (
        <StyledSection>
          {randomPicture ? (
            <StyledOpeningImage
              src={randomPicture.url}
              alt="zufällig generiertes Bild aus der Freundesgalerie"
              width={randomPicture.width}
              height={randomPicture.height}
            />
          ) : (
            <StyledOpeningImage
              src="/hands-2847508_1920.jpg"
              alt="Bild von Freunden"
              width={384}
              height={256}
            />
          )}
          {votes !== undefined && <Votecard />}
          <Dashboard />
        </StyledSection>
      ) : (
        <>
          <StyledOpeningImage
            src="/hands-2847508_1920.jpg"
            alt="Bild von Freunden"
            width={384}
            height={256}
          />
          <section>
            <StyledHeadlineSection>
              Du musst dich einloggen um hier etwas zu sehen
            </StyledHeadlineSection>
          </section>
        </>
      )}
    </>
  );
}
const FadeInAnimation = keyframes`
0% {opacity: 0}
100% {opacity: 1}
`;
const StyledOpeningImage = styled(Image)`
  display: block;
  margin: auto;

  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
  width: 80%;
  height: 80%;
  max-width: 400px;
  animation-name: ${FadeInAnimation};
  animation-duration: 3s;
`;
const StyledHeadlineSection = styled.h1`
  animation-name: ${FadeInAnimation};
  animation-duration: 1.5s;
  font-size: var(--font-headlines);
  color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  margin: 2rem;
  padding: 5rem;
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
`;

const StyledSection = styled.section`
  max-width: 400px;
  max-height: 500px;
`;
