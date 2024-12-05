import React from "react"
import { useState } from "react"
import { RowCard } from "../components/rowCard"
import { useEffect } from "react"
import axios from "axios"


export function TabelaSensores(){

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [sensores, setSensores] = useState([])

    

    useEffect(() => {
        const fetchSensores = async () => {
          try {
            const response = await axios.get("http://127.0.0.1:8000/api/sensor/", {
                headers: { 
                    Authorization: `Bearer ${token}` 
                },
            });
            const sensoresDados = await Promise.all(
              response.data.map(async (sensor) => {
                try {
                    const tipoResponse = await axios.get(`http://127.0.0.1:8000/api/tipos_sensor/${sensor.tipo}/`,
                    { 
                        headers: { 
                            Authorization: `Bearer ${token}` 
                        } 
                    });

                    return { 
                        ...sensor, 
                        tipo: tipoResponse.data.tipo 
                    };
                
                } catch (error) {

                    return { 
                        ...sensor, 
                        tipo: "Desconhecido" 
                    }; 

                }
              })
            );
            setSensores(sensoresDados);
          } catch (error) {

            console.error("Erro ao buscar sensores:", error);

          }
        };
    
        fetchSensores();

      }, [token]);


    

    return(
        <div className="w-full h-full flex">

            <div className="w-9/12 h-full flex flex-col gap-10 py-10 px-20 overflow-auto">


                {sensores.map((sensor) => (

                    <RowCard key={sensor.id} id_sensor={sensor.id} localizacao={sensor.localizacao} responsavel={sensor.responsavel} tipo={sensor.tipo} />
                ))}

            </div>

            <div className="w-3/12 h-full bg-red-300">

            </div>


        </div>
    )

}