import React from "react";
import { getFormattedHackathons } from "@/actions/getHackathons";
import { Skeleton } from "@/components/ui/skeleton";

interface HackathonCardProps {
  from: string;
  name: string;
  date?: Date;
  end_date?: Date;
  location?: string;
  description?: string;
  url: string;
  registration_start_date: Date;
  registration_end_date: Date;
  team_size?: number;
  team_min?: number;
}

export default async function Home() {
  const hackathons = await getFormattedHackathons();
  hackathons.sort((a, b) => {
    const registrationEndDateA = a.registration_end_date.getTime();
    const registrationEndDateB = b.registration_end_date.getTime();

    return registrationEndDateA - registrationEndDateB;
  });
  console.log(hackathons);
  return (
    <>
    <div className="h-full w-full p-5 text-white">
      <div className="text-3xl font-bold">Hackathons</div>
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-3 lg:gap-4">
        {hackathons.map((hackathon: HackathonCardProps) => {
          return (
            <HackathonCard
              from={hackathon.from}
              name={hackathon.name}
              date={hackathon.date}
              end_date={hackathon.end_date}
              location={hackathon.location}
              description={hackathon.description}
              url={hackathon.url}
              team_size={hackathon.team_size}
              team_min={hackathon.team_min}
              registration_end_date={hackathon.registration_end_date}
              registration_start_date={hackathon.registration_start_date}
            />
          );
        })}
      </div>
    </div>
    </>
  );
}

async function HackathonCard(props: HackathonCardProps) {
  if (props.from === "Devfolio") {
    return (
      <a
        href={props.url}
        target="_blank"
        className="mt-5 h-[12rem] w-full space-y-2 rounded-2xl border border-slate-300 bg-black p-5 transition-all duration-100 hover:bg-slate-800"
      >
        <div className="truncate text-2xl font-bold">{props.name}</div>
        <div>
          <div className="w-full">
            <div className="truncate text-sm">
              <span className="font-bold">Location:</span> {props.location}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="truncate text-sm">
              <span className="font-bold">Team Size:</span> {props.team_size}
            </div>
            <div className="truncate text-sm">
              <span className="font-bold">Minimum Team Size:</span>{" "}
              {props.team_min}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="truncate text-sm">
              <span className="font-bold">Registration Start Date:</span>{" "}
              {props.registration_start_date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="truncate text-sm">
              <span className="font-bold">Registration End Date:</span>{" "}
              {props.registration_end_date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="truncate text-sm">
              <span className="font-bold">Hack Begins:</span>{" "}
              {props.date?.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="truncate text-sm">
              <span className="font-bold">Hack Ends:</span>{" "}
              {props.end_date?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
        <div className="truncate text-sm">
          <span className="font-bold">Description:</span> {props.description}
        </div>
      </a>
    );
  } else if (props.from == "Devpost") {
    return (
      <a
        href={props.url}
        target="_blank"
        className="mt-5 h-[12rem] w-full space-y-2 rounded-2xl border border-slate-300 bg-black p-5 transition-all duration-100 hover:bg-slate-800"
      >
        <div className="truncate text-2xl font-bold">{props.name}</div>
        <div>
          <div className="w-full">
            <div className="truncate text-sm">
              <span className="font-bold">Location:</span> {props.location}
            </div>
          </div>
          <div className="truncate text-sm">
            <span className="font-bold">Registration Start Date:</span>{" "}
            {props.registration_start_date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
          <div className="truncate text-sm">
            <span className="font-bold">Registration End Date:</span>{" "}
            {props.registration_end_date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </a>
    );
  } else if (props.from == "Unstop") {
    return (
      <a
        href={props.url}
        target="_blank"
        className="mt-5 h-[12rem] w-full space-y-2 rounded-2xl border border-slate-300 bg-black p-5 transition-all duration-100 hover:bg-slate-800"
      >
        <div className="truncate text-2xl font-bold">{props.name}</div>
        <div>
          {props.team_size != -1 ? (<div className="grid grid-cols-2 gap-3">
            <div className="truncate text-sm">
              <span className="font-bold">Team Size:</span> {props.team_size}
            </div>
            <div className="truncate text-sm">
              <span className="font-bold">Minimum Team Size:</span>{" "}
              {props.team_min}
            </div>
          </div>) : <></>}
          <div className="grid grid-cols-2 gap-3">
            <div className="truncate text-sm">
              <span className="font-bold">Registration Start Date:</span>{" "}
              {props.registration_start_date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="truncate text-sm">
              <span className="font-bold">Registration End Date:</span>{" "}
              {props.registration_end_date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="truncate text-sm">
              <span className="font-bold">Hack Begins:</span>{" "}
              {props.date?.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="truncate text-sm">
              <span className="font-bold">Hack Ends:</span>{" "}
              {props.end_date?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
        <div className="truncate text-sm">
          <span className="font-bold">Description:</span> {props.description}
        </div>
      </a>
    )
  }
}
