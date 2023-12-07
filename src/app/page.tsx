import { fetchDevfolio, fetchDevpost, fetchUnstop } from "@/actions/getHackathons";

export default async function Home() {
  const res = await fetchUnstop();
  console.log(res);
  return (
    <main>
     hi
    </main>
  );
}
