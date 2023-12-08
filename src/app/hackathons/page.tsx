import React from 'react'
import { getFormattedHackathons } from '@/actions/getHackathons'
import { parseDateRange } from '@/utils/parseDate';

interface HackathonCardProps {
  from: string;
  name: string;
  date?: Date;
  end_date?: Date;
  location: string;
  description?: string;
  url: string;
  registration_start_date: Date;
  registration_end_date: Date;
  team_size?: number;
  team_min?: number;
}

export default async function Hackathons () {
  const hackathons = await getFormattedHackathons();
  console.log(hackathons);
  return (
    <div className="w-full h-full p-5 text-white">
        <div className="text-3xl font-bold">Hackathons</div>
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-3 lg:gap-4">
          {
              hackathons.map((hackathon: HackathonCardProps) => {
                  return <HackathonCard from={hackathon.from} name={hackathon.name} date={hackathon.date} end_date={hackathon.end_date} location={hackathon.location} description={hackathon.description} url={hackathon.url} team_size={hackathon.team_size} team_min={hackathon.team_min} registration_end_date={hackathon.registration_end_date} registration_start_date={hackathon.registration_end_date} />
              })
          }
        </div>
    </div>
  )
}

async function HackathonCard (props: HackathonCardProps) {
    return (
    <a href={props.url} target="_blank" className="mt-5 transition-all duration-100 hover:bg-slate-800 bg-slate-950 w-full h-[12rem] p-5 rounded-2xl border border-slate-300 space-y-2">
        <div className="text-2xl truncate font-bold">{props.name}</div>
        <div>
          <div className="w-full">
            <div className="text-sm truncate"><span className="font-bold">Location:</span> {props.location}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-sm truncate"><span className="font-bold">Team Size:</span> {props.team_size}</div>
            <div className="text-sm truncate"><span className="font-bold">Minimum Team Size:</span> {props.team_min}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-sm truncate"><span className="font-bold">Registration Start Date:</span> {props.registration_start_date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            <div className="text-sm truncate"><span className="font-bold">Registration End Date:</span> {props.registration_end_date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-sm truncate"><span className="font-bold">Hack Begins:</span> {props.date?.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            <div className="text-sm truncate"><span className="font-bold">Hack Ends:</span> {props.end_date?.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
          </div>
        </div>
        <div className="text-sm truncate"><span className="font-bold">Description:</span> {props.description}</div>
    </a>
    )
}