import NavigationBar from "@/components/NavigationBar";
import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [activityCards, setActivityCards] = useLocalStorageState(
    "activityList",
    {
      defaultValue: [],
    }
  );


  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        activityCards={activityCards}
        setActivityCards={setActivityCards}
      />
      <NavigationBar />
    </>
  );
}
