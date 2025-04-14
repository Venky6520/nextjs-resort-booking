"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import { useEffect,useState } from 'react'

const DynamicProduct = () => {
    const [record, setRecord] = useState("")
    const params = useParams()
    const { id } = params



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
  return (
    <div>
      <h1>Dynamic Product</h1>
        <h2>Product ID: {id}</h2>
        <div>
       Title:     {record.title}
        </div>
        <div>
         Price: {record.price}
            </div>
        <div>
            Description: {record.desc}
            </div>
        <div>
            Amenities:
            {record.amen && record.amen.map((item, i) => {
                return (
                    <div key={i}>
                        {item}
                    </div>
                )
            })}
            </div>
        <div>
            Offer: {record.offer}
            </div>
        <div>
<img src={record.image} alt="" />            </div>
    </div>
  )
}

export default DynamicProduct
