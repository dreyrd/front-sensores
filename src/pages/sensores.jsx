import React from 'react';
import { Input } from '../components/input';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function Sensores(){

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')


    const [sensorMac, setSensorMac] = useState('')
    const [sensorLatitude, setSensorLatitude] = useState('')
    const [sensorLongitude, setSensorLongitude] = useState('')
    const [sensorLocalizacao, setSensorLocalizacao] = useState('')
    const [sensorResponsavel, setSensorResponsavel] = useState('')
    const [sensorMedida, setSensorMedida] = useState('')
    const [sensorObservacao, setSensorObservacao] = useState('')
    const [sensorTipo, setSensorTipo] = useState(1)

    const [tiposSensores, setTiposSensores] = useState([])


    useEffect(() => {
        const fetchSensores = async () => {
            try {
            const response = await axios.get("http://127.0.0.1:8000/api/tipos_sensor/", {
                headers: { 
                    Authorization: `Bearer ${token}` 
                },
            });

            console.log(response.data)
            
            setTiposSensores(response.data);


            } catch (error) {

            console.error("Erro ao buscar tipo de sensores:", error);

            }
        };
    
        fetchSensores();
    
    }, [token]);


    const checarCampos = () => {

        if (sensorMac.trim() === '' || sensorLatitude === '' || sensorLongitude === '' || sensorLocalizacao.trim() === '' || sensorResponsavel.trim() === '' || sensorMedida.trim() === '' || sensorObservacao.trim() === '' || sensorTipo === '' || sensorTipo === 0) {
            return true;
        }
        return false;
        
    }



    const cadastrarSensor = async () => {
        setErro('')
        setSucesso('')

        if(!checarCampos()){
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/sensor/", {

                    
                    mac_address: sensorMac,
                    latitude: sensorLatitude,
                    longitude: sensorLongitude,
                    localizacao: sensorLocalizacao,
                    responsavel: sensorResponsavel,
                    unidade_medida: sensorMedida,
                    status_operacional: true,
                    observacao: sensorObservacao,
                    tipo: sensorTipo

                },
                {
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    },
                });

                setSucesso('Sensor cadastrado com sucesso')
                
                setSensorMac('')
                setSensorLatitude('')
                setSensorLongitude('')
                setSensorLocalizacao('')
                setSensorResponsavel('')
                setSensorMedida('')
                setSensorObservacao('')
                setSensorTipo(1)
                
                
            } catch (error) {

                setErro('Erro ao cadastrar sensor: ' + error)
            };
        }
        else{
            setErro('Preencha todos os campos')
        }
        
    }



    return(
        <div className="flex justify-center items-center">

            <div className="flex flex-col justify-center items-center border-2 border-vermelhoBotao w-1/2 h-auto rounded gap-y-8 p-8">

                <h1 className='font-sans text-5xl'>Adicione um sensor</h1>

                <div className='flex justify-center w-full h-auto flex-wrap gap-8'>
                    <Input nome="Mac Address" tipo="text" habilitar={false} value={sensorMac} onChange={(e) => setSensorMac(e.target.value) } />
                    <Input nome="Latitude" tipo="number" habilitar={false} value={sensorLatitude} onChange={(e) => setSensorLatitude(e.target.value) } />
                    <Input nome="Longitude" tipo="number" habilitar={false} value={sensorLongitude} onChange={(e) => setSensorLongitude(e.target.value) } />
                    <Input nome="Localização" tipo="text" habilitar={false} value={sensorLocalizacao} onChange={(e) => setSensorLocalizacao(e.target.value) } />
                    <Input nome="Responsável" tipo="text" habilitar={false} value={sensorResponsavel} onChange={(e) => setSensorResponsavel(e.target.value) } />
                    <Input nome="Medida" tipo="text" habilitar={false} value={sensorMedida} onChange={(e) => setSensorMedida(e.target.value) } />
                    <Input nome="Observação" tipo="text" habilitar={false} value={sensorObservacao} onChange={ (e) => setSensorObservacao(e.target.value) } />
                </div>

                <select name="tipo" id="sensorTipo" value={sensorTipo} onChange={(e) => setSensorTipo(e.target.value)} className='flex justify-center items-center bg-neutral-300 rounded py-2 px-20 w-1/1'>

                    {tiposSensores.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>{tipo.tipo}</option>
                    ))}

                </select>

                <p className={`${erro? 'text-vermelhoBotao' : 'text-green-500'}`}>{erro? erro : sucesso? sucesso : ''}</p>

                <input type="submit" value="Cadastrar" className='w-full py-2 bg-green-500 rounded text-white cursor-pointer' onClick={cadastrarSensor} />

                

            </div>

        </div>
    )

}