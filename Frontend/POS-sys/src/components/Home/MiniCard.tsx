import React from 'react'

type Props={
    title: string,
    icon: React.ReactNode,
    number: number,
    footerNum: number,
}


const MiniCard:React.FC<Props> = ({ title, icon, number, footerNum}) => {
  return (
    <div className='bg-blackbg py-3 px-2 rounded-lg w-[55%]'>
        <div className='flex items-start justify-between'>
            <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>{title}</h1>
            <button className={`${title === "Total Earnings" ? "bg-[#02ca3a]" : "bg-yellowbg"} p-3 rounded-lg text-whitebg text-2xl`}>{icon}</button>
        </div>
        <div>
            <h1 className='text-whitebg text-4xl font-bold mt-5'>{
              title === "Total Earnings" ? `₹${number}` : number}</h1>
            <h1 className='text-whitebg text-lg mt-2'><span className='text-[#02ca3a]'>{footerNum}%</span> than yesterday</h1>
        </div>
    </div>
      
  )
}

export default MiniCard;
