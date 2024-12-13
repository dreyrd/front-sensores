import React from "react"
import { useState } from "react"
import { RowCard } from "../components/rowCard"
import { useEffect } from "react"
import axios from "axios"


export function TabelaSensores(){

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [sensores, setSensores] = useState([])

    const [sensorId, setSensorId] = useState('')
    const [sensorLocalizacao, setSensorLocalizacao] = useState('')
    const [sensorResponsavel, setSensorResponsavel] = useState('')
    const [sensorTipo, setSensorTipo] = useState('')
    const [sensorLatitude, setSensorLatitude] = useState('')
    const [sensorLongitude, setSensorLongitude] = useState('')
    const [sensorStatus, setSensorStatus] = useState('')
    const [sensorObservacao, setSensorObservacao] = useState('')


    const detalhesSensores = (sensor) => {
        setSensorId(sensor.id);
        setSensorLocalizacao(sensor.localizacao);
        setSensorResponsavel(sensor.responsavel);
        setSensorTipo(sensor.tipo);
        setSensorLatitude(sensor.latitude);
        setSensorLongitude(sensor.longitude);
        setSensorStatus(sensor.status_operacional);
        setSensorObservacao(sensor.observacao);

    }

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

                    <RowCard key={sensor.id} id_sensor={sensor.id} localizacao={sensor.localizacao} responsavel={sensor.responsavel} tipo={sensor.tipo} funcao={() => detalhesSensores(sensor)} />
                ))}

            </div>

            <div className="w-3/12 h-full bg-red-300 text-lg">

                {sensorId !== ''? <p>ID: {sensorId}</p> : null }
                {sensorLocalizacao !== ''? <p>Localização: {sensorLocalizacao}</p> : null }
                {sensorResponsavel !== ''? <p>Responsável: {sensorResponsavel}</p> : null }
                {sensorTipo !== ''? <p>Tipo: {sensorTipo}</p> : null}
                {sensorLatitude !== ''? <p>Latitude: {sensorLatitude}</p> : null}
                {sensorLongitude !== ''? <p>Longitude: {sensorLongitude}</p> : null}
                {sensorStatus !== ''? <p>Status: {sensorStatus}</p> : null}
                {sensorObservacao !== ''? <p>Observação: {sensorObservacao}</p> : null}

            </div>


        </div>
    )

}