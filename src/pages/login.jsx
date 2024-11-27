import React from "react";
import { Input } from "../components/input";
import { ImageCard } from "../components/imageCard";
import { useState } from "react";
import axios from "axios";

export function Login() {

    const [posicao, setPosicao] = useState(true)

    const mudarCard = () => {
        setPosicao(!posicao)
    }

    

    try{
        axios.post('http://127.0.0.1:8000/api/token/')
    }
    catch(error){
        console.log(error)
    }


    return(
        <div className="flex">
            <section className="w-1/2 h-screen flex items-center justify-center">

                <div className="flex flex-col items-center justify-center w-auto h-auto space-y-5">
                    <div className="space-y-5">
                        <Input nome="Login" tipo="text" habilitar={!posicao} />
                        <Input nome="Senha" tipo="password" habilitar={!posicao} />
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-10">
                        <div className="text-azulLink text-sm space-y-1">
                            <p className="cursor-pointer hover:underline">Esqueci a senha</p>
                            <p className="cursor-pointer hover:underline" onClick={mudarCard}>Criar uma conta</p>
                        </div>

                        <input type="submit" name="login" value="Login" className="rounded bg-neutral-300 focus:outline-none my-1 py-1 px-2 cursor-pointer bg-vermelhoBotao text-white mt-20" />
                    </div>
                </div>

                
            </section>

            <section className="w-1/2 h-screen flex items-center justify-center">

                <div className="flex flex-col items-center justify-center w-auto h-auto space-y-5">
                    <div className="space-y-5">
                        <Input nome="Nome" tipo="text" habilitar={posicao} />
                        <Input nome="Email" tipo="text" habilitar={posicao} />
                        <Input nome="Senha" tipo="password" habilitar={posicao} />
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-10">
                        <div className="text-azulLink text-sm">
                            <p className="cursor-pointer hover:underline" onClick={mudarCard}>Já tenho uma conta</p>
                        </div>

                        <input type="submit" name="cadastrar" value="Cadastrar" className="rounded bg-neutral-300 focus:outline-none my-1 py-1 px-2 cursor-pointer bg-vermelhoBotao text-white" />
                    </div>
                </div>

                
            </section>
            
            <ImageCard posicao={posicao} />
        </div>
    )

}