import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Votecard from "@/components/Votecard";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { styled } from "styled-components";

export default function HomePage({ dates, setDates, voteDoneArray }) {
  const { data: listOfAllVotesInProgress } = useSWR("api/voteForActivityDate");
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <>
          <StyledOpeningImage
            src="/hands-2847508_1920.jpg"
            alt="Bild von Freunden"
            width={384}
            height={256}
          />
          {listOfAllVotesInProgress !== undefined && (
            <Votecard dates={dates} setDates={setDates} />
          )}
          <Dashboard voteDoneArray={voteDoneArray} dates={dates} />
        </>
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

const StyledOpeningImage = styled(Image)`
  margin: 1.2rem;
  padding: 0;
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
`;
const StyledHeadlineSection = styled.h1`
  font-size: var(--font-headlines);
  color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  margin: 2rem;
  padding: 5rem;
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
`;
