"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import { useEffect,useState } from 'react'
import Link from 'next/link'
import UserNavigation from "../../../components/UserNavigation"
import CalenderComponent from "../../../components/CalenderComponent"
import { bookingAction } from "../../../serverActions/bookingAction"

const DynamicProduct = () => {
    const [record, setRecord] = useState("")
    const params = useParams()
    const { id } = params

    const [selectedDates, setSelectedDates] = useState(null)



    console.log("Dynamic client ID", id)


    const dynamicHandler = async () => {
        const response = await fetch(`http://localhost:3000/api/admin/product/${id}`)
        const newData = await response.json()
        console.log("Dynamic Product Data", newData)
        setRecord(newData.user)
       
    }
useEffect(() => {
    dynamicHandler()
}
, [])


const bookingHandler = async () => {

  if(!selectedDates){
    alert("Please select dates first")
    return
  }
  console.log("Booking Handler", record)
  const bookingDetails = {record, selectedDates}

  try{
    await bookingAction(bookingDetails)
    console.log("Booking action called")
  }
  catch(error){}
}

const handleDateSelect = (dates) => {
  setSelectedDates(dates)

  console.log(" Dates coming from calendar", dates)

}
  return (
    <div>
        <UserNavigation/>
        <CalenderComponent onDatesSelect={handleDateSelect}/>
        <Link href="/">
        <p align="center">Go Back</p>
        </Link>
      {record? 
         (<div className="">
            <div className="singleSection">
            <div className="singleLeft">
              <div className="">
               <h2>{record.title}</h2>
              </div>
              <img src={record.image} alt={record.title} className="singleImage"/>
              </div>
              <div className="singleCenter">
               <div className="singlePrice">Rs.{record.price}</div>
               <p className="singleDesc">{record.desc}</p>
               <div className="">
                   {record.amen.map((item, i)=>{
                       return(
                           <div className="singleAmen"  key={i}>
                              <span>*</span> {item}
                           </div>
                       )
                   })}
               </div>
               <div className="offer">
               <span>*</span>
                  <button>  Discount {record.offer}</button>
               </div>
               <div className="singleBtn">
                   <button className=""  onClick={bookingHandler} >Book Now</button>
               </div>
              </div>
            </div>

           </div>)
        :<h1 style={{position:'absolute', top:'50%', left:'50%'}}>  
        Loading
          {/* <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        /> */}
        </h1>}
</div>
  )
}

export default DynamicProduct
