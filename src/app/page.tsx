import React from "react";
import { getFormattedHackathons } from "@/actions/getHackathons";

const Home = async () => {
  const res = await getFormattedHackathons();
  console.log(res);
  return <div>Home</div>;
};

export default Home;
