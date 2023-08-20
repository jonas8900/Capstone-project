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
      />
      <NavigationBar />
    </>
  );
}

export const StyledHeadline = styled.h1`
  text-align: center;
  border-bottom: 2px solid black;
`;
