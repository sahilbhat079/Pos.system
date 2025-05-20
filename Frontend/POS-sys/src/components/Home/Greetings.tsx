import React from 'react'
import { useAppSelector } from '../../hooks/reduxhooks'
const Greetings:React.FC = () => {
  const {name } = useAppSelector((state) => state.userReducer)

  const [dateTime,setdateTime]=React.useState<Date>(new Date())


  React.useEffect(() => {
   const timer=setInterval(() => {
        setdateTime(new Date())
   }, 1000);

return ()=>clearInterval(timer)
  },[]);


  const formatDate=(date:Date):string=>{

  const months=['January','February','March','April','May','June','July','August','September','October','November','December']


    return  `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
  }


// Helper function to format the time
const formatTime = (date: Date): string =>
  `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
    date.getSeconds()
  ).padStart(2, "0")}`;


  return (
    <div className="flex justify-between items-center px-8 mt-5">
     <div>
        <h1 className="text-[#f5f5f5] text-2xl font-semibold tracking-wide">
          Good Morning, {name || "TEST USER"}
        </h1>
        <p className="text-[#ababab] text-sm">
          Give your best services for customers 😀
        </p>
      </div>
      <div>
        <h1 className="text-[#f5f5f5] text-3xl font-bold tracking-wide w-[130px]">
          {formatTime(dateTime)}
        </h1>
        <p className="text-[#ababab] text-sm">{formatDate(dateTime)}</p>
      </div>

      
    </div>
  )
}

export default Greetings
