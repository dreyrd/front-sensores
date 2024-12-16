import React from "react"
import { useState } from "react"
import { RowCard } from "../components/rowCard"
import { useEffect } from "react"
import axios from "axios"
import { Input } from "../components/input"
import { PopUp } from "../components/popUp"
import { useNavigate } from "react-router-dom"


export function TabelaSensores(){
    
    const navigate = useNavigate();

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

    const [abrirPopUp, setAbrirPopUp] = useState(false)


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

    const fecharPopUp = () => {
        
        setAbrirPopUp(false);

        navigate('/login');

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

            setAbrirPopUp(true);

          }
        };
    
        fetchSensores();

    }, [token]);

    const deletarSensor = async () => {

        try {
            await axios.delete(`http://127.0.0.1:8000/api/sensor/${sensorId}/`, {
                headers: { 
                    Authorization: `Bearer ${token}` 
                },
            });
            
            setSensorId('')
            setSensorLocalizacao('')
            setSensorResponsavel('')
            setSensorTipo('')
            setSensorLatitude('')
            setSensorLongitude('')
            setSensorStatus('')
            setSensorObservacao('')

            window.location.reload();

            
        } catch (error) {

            console.error("Erro ao deletar sensor:", error);

            setAbrirPopUp(true);

        }


    }


    

    return(
        <div className="w-full h-full flex">

            <div className="w-9/12 h-full flex flex-col gap-10 py-10 px-20 overflow-auto">
 
                
                <PopUp abrir={abrirPopUp} fechar={fecharPopUp} >

                    <div className="flex justify-center items-center w-auto h-auto px-10 pb-6 pt-2">
                        <h1 className="text-xl">Seu token expirou</h1>
                    </div>

                </PopUp>


                {sensores.map((sensor) => (

                    <RowCard key={sensor.id} id_sensor={sensor.id} localizacao={sensor.localizacao} responsavel={sensor.responsavel} tipo={sensor.tipo} funcao={() => detalhesSensores(sensor)} />
                ))}

            </div>

            <div className="flex flex-col w-3/12 h-full bg-red-300 text-lg px-8">

                {sensorId? <Input nome="ID" type="text" habilitar={true} value={sensorId} onChange={(e) => setSensorId(e.target.value)} className="w-full"/> : 

                    <div className="h-full w-full flex items-center justify-center">
                        <h2>Selecione um sensor para ver os detalhes</h2>
                    </div>
                
                }
                {sensorLocalizacao? <Input nome="Localização" type="text" habilitar={true} value={sensorLocalizacao} onChange={(e) => setSensorLocalizacao(e.target.value)} className="w-full"/> : null}
                {sensorResponsavel? <Input nome="Responsável" type="text" habilitar={true} value={sensorResponsavel} onChange={(e) => setSensorResponsavel(e.target.value)} className="w-full"/> : null}
                {sensorTipo? <Input nome="Tipo" type="text" habilitar={true} value={sensorTipo} onChange={(e) => setSensorTipo(e.target.value)} className="w-full"/> : null}
                {sensorLatitude? <Input nome="Latitude" type="text" habilitar={true} value={sensorLatitude} onChange={(e) => setSensorLatitude(e.target.value)} className="w-full"/> : null}
                {sensorLongitude? <Input nome="Longitude" type="text" habilitar={true} value={sensorLongitude} onChange={(e) => setSensorLongitude(e.target.value)} className="w-full"/> : null}
                {sensorStatus? <Input nome="Status" type="text" habilitar={true} value={sensorStatus} onChange={(e) => setSensorStatus(e.target.value)} className="w-full"/> : null}
                {sensorObservacao? 
                    <div className="h-auto w-auto">
                        <h2 className="font-sans text-xl" >Observação</h2>
                        <textarea name="Observação" disabled={true} value={sensorObservacao} onChange={(e) => setSensorObservacao(e.target.value)} className="w-full h-auto p-2 rounded bg-neutral-300 focus:outline-none" style={{ resize: "none" }} />
                    </div>
                : null}

                {sensorId? 
                    <div className="w-auto h-auto mt-auto mb-12">
                        <input type="submit" value="Deletar" onClick={deletarSensor} className="flex w-full h-auto py-2 items-center justify-center rounded bg-vermelhoBotao cursor-pointer text-white" /> 
                    </div>
                : null}

            </div>


        </div>
    )

}