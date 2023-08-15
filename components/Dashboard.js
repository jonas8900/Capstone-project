import  styled  from "styled-components";
import DashboardActivityCard from "./DashboardActivityCard";

export default function Dashboard() {
  return (
    <>
      <StyledHeadline>Friends</StyledHeadline>
      <DashboardActivityCard />
    </>
  );
}

export const StyledHeadline = styled.h1`
  text-align: center;
  border-bottom: 2px solid black;
`;
