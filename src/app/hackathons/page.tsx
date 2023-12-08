import React from 'react'
import { getFormattedHackathons } from '@/actions/getHackathons'

interface HackathonCardProps {
    name: string;
    date: Date;
    location: string;
    description: string;
    url: string;
}

export default async function Hackathons () {
  const hackathons = await getFormattedHackathons();
  return (
    <div className="w-full h-screen p-5 bg-black text-white">
        <div className="text-3xl font-bold">Hackathons</div>
        <div className="grid grid-cols-3 gap-4">
          {
              hackathons.map((hackathon: HackathonCardProps) => {
                  return <HackathonCard name={hackathon.name} date={hackathon.date} location={hackathon.location} description={hackathon.description} url={hackathon.url} />
              })
          }
        </div>
    </div>
  )
}

async function HackathonCard (props: HackathonCardProps) {
    return (
    <a href={props.url} target="_blank" className="mt-5 transition-all duration-100 hover:bg-slate-800 bg-slate-950 w-full h-[10rem] p-5 rounded-2xl border border-slate-300 space-y-2">
        <div className="text-2xl truncate">{props.name}</div>
        <div className="text-sm truncate"><span className="font-bold">Location:</span> {props.location}</div>
        <div className="text-sm truncate"><span className="font-bold">Date:</span> {props.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
        <div className="text-sm truncate"><span className="font-bold">Description:</span> {props.description}</div>
    </a>
    )
}