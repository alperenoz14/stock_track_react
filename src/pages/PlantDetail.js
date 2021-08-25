import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function PlantDetail() {

    let {id} = useParams()
    console.log(id)

    return (
        <div>
            <h1>{id}</h1>
        </div>
    )
}
