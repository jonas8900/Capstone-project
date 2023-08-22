import NavigationBar from "@/components/NavigationBar";
import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import { styled } from "styled-components";

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
      <StyledHeadline>Friends</StyledHeadline>
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
  text-align: center;
  border-bottom: 2px solid black;
`;
