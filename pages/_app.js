import NavigationBar from "@/components/NavigationBar";
import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import { styled } from "styled-components";
import Image from "next/image";

export default function App({ Component, pageProps }) {
  const [activityCards, setActivityCards] = useLocalStorageState(
    "activityList",
    {
      defaultValue: [],
    }
  );

  const [dates, setDates] = useLocalStorageState("dates", { defaultValue: [] });

  const voteDoneArray = dates.filter((date) =>
    date.hasOwnProperty("finalDateID")
  );

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

  voteDoneArray.sort(compareDatesToSort);

  return (
    <>
      <GlobalStyle />
      <StyledHeadline>
        <StyledImage
          alt="Friends-Logo"
          src="/Logo Files/For Web/logo2-nobackground-200.png"
          width={120}
          height={120}
          priority={false}
        />
      </StyledHeadline>
      <Component
        {...pageProps}
        activityCards={activityCards}
        setActivityCards={setActivityCards}
        dates={dates}
        setDates={setDates}
        voteDoneArray={voteDoneArray}
      />
      <NavigationBar />
    </>
  );
}

export const StyledHeadline = styled.h1`
  text-align: left;
  border-bottom: 4px solid transparent;
  border-image: linear-gradient(
    90deg,
    rgba(255, 77, 77, 1) 0%,
    rgba(255, 187, 81, 1) 31%,
    rgba(72, 70, 248, 1) 69%,
    rgba(73, 26, 188, 1) 100%
  );
  border-image-slice: 1;
  width: 100%;
  display: flex;
  margin: auto;
  padding: 1rem;
  margin-bottom: 3rem;
`;

const StyledImage = styled(Image)`
  margin-bottom: -3rem;
`;
