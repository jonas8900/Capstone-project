import NavigationBar from "@/components/NavigationBar";
import GlobalStyle from "../styles";
import { activityList } from "@/dummyList/activityList";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [activityCards, setActivityCards] = useLocalStorageState(
    "activityList",
    {
      defaultValue: activityList,
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
