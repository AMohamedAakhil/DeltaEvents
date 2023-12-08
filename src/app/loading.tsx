import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <>
        <div className="p-5">
            <Skeleton className="mt-5 w-[20rem] h-[3.5rem]" />
            <div className="mt-10 flex flex-col md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-3 lg:gap-4">
              <Skeleton className="h-[10rem] w-full" />
              <Skeleton className="h-[10rem] w-full" />
              <Skeleton className="h-[10rem] w-full" />
            </div>
        </div>
    </>
  )
}

export default Loading