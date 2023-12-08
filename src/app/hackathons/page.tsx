import React from 'react'

interface HackathonCardProps {
    name: string;
    date: Date;
    location: string;
    description: string;
}

export default async function Hackathons () {
  return (
    <div className="w-full h-screen p-5 bg-black text-white">
        <div className="text-3xl font-bold">Hackathons</div>
        <HackathonCard name="hi" date={new Date("08/12/2023")} location="Chennai" description="hi" />
    </div>
  )
}

async function HackathonCard (props: HackathonCardProps) {
    return (
    <div className="mt-5 transition-all duration-100 hover:bg-slate-800 bg-slate-950 w-[30rem] h-[10rem] p-5 rounded-2xl border border-slate-300 space-y-2">
        <div className="text-2xl">{props.name}</div>
        <div className="text-sm">{props.location}</div>
        <div className="text-sm">{String(props.date)}</div>
        <div className="text-sm truncate">{props.description}</div>
    </div>
    )
}