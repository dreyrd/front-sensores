import React from "react"
import { useState } from "react"
import { RowCard } from "../components/rowCard"
import { useEffect } from "react"
import axios from "axios"


export function TabelaSensores(){

    const [token, setToken] = useState('')

    

    useEffect(()=>{
        try{
            setToken(localStorage.getItem('token'))
            console.log(token)
        }
        catch(error){
            console.log(error)
        }
    }, [])


    try{
        const sensores = axios.get('http://127.0.0.1:8000/api/sensor/',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            console.log(sensores)

        })
    }
    catch(error){
        console.log(error)
    }

    return(
        <div className="w-full h-full flex flex-col gap-10 pt-10 px-20">

            <RowCard id_sensor="1" localizacao="102" responsavel="Andrey" tipo="Temperatura" />

        </div>
    )

}