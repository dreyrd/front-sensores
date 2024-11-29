import React, { useEffect } from "react";
import { Input } from "../components/input";
import { ImageCard } from "../components/imageCard";
import { PopUp } from "../components/popUp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function Login() {

    const navigate = useNavigate()

    const [posicao, setPosicao] = useState(true)
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')

    const [token, setToken] = useState('')

    const [loginCadastrar, setLoginCadastrar] = useState('')
    const [emailCadastrar, setEmailCadastrar] = useState('')
    const [senhaCadastrar, setSenhaCadastrar] = useState('')

    const [popUpAbrir, setPopUpAbrir] = useState(false)

    const [erro, setErro] = useState('')

    useEffect(() => {
        if(token){
            try{
                localStorage.setItem('token', token)
                localStorage.setItem('login', login)

                navigate('/home')
            }
            catch(error){
                console.log(error)
            }
        }
    }, [token])

    const mudarCard = () => {
        setPosicao(!posicao)
    }

    const popUpCadastro = () => {
        setLogin('')
        setSenha('')

        setPopUpAbrir(!popUpAbrir)
    }

    const checarCadastro = () => {
        if(loginCadastrar && emailCadastrar && senhaCadastrar){
            popUpCadastro()
        }
    }

    
    const logar = () => {
        try{
            axios.post('http://127.0.0.1:8000/api/token/', {
                username: login,
                password: senha
            })
            .then((response) => {
                setToken(response.data.access)
            })
        }
        catch(error){
            console.log(error)
        }
    }

    const cadastrar = () => {
        if(login && senha){
            try{
                axios.post('http://127.0.0.1:8000/api/token/', {
                    username: login,
                    password: senha
                })
                .then((response) => {
                    try{
                        axios.post('http://127.0.0.1:8000/api/criarusuario/', {
                            username: loginCadastrar,
                            email: emailCadastrar,
                            password: senhaCadastrar
                        }, 
                        {
                            headers: {
                                Authorization: `Bearer ${response.data.access}`
                            }
                        })
                        .then(() => {
                            
                            setLogin(loginCadastrar)
                            setSenha(senhaCadastrar)
                            logar()

                        })
                    }
                    catch(error){
                        console.log(error)
                    }
                })
            }
            catch(error){
                console.log(error)
            }
            
        }
    }

    return(
        <div className="flex">
            <section className="w-1/2 h-screen flex items-center justify-center">

                <form onSubmit={(e) => {e.preventDefault(); logar();}} className="flex flex-col items-center justify-center w-auto h-auto space-y-5">
                    <div className="space-y-5">
                        <Input nome="Login" tipo="text" habilitar={!posicao} value={login} onChange={(e) => setLogin(e.target.value) } />
                        <Input nome="Senha" tipo="password" habilitar={!posicao} value={senha} onChange={(e) => setSenha(e.target.value) } />
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-10">
                        <div className="text-azulLink text-sm space-y-1">
                            <p className="cursor-pointer hover:underline">Esqueci a senha</p>
                            <p className="cursor-pointer hover:underline" onClick={mudarCard}>Criar uma conta</p>
                        </div>

                        <input type="submit" name="login" value="Login" className="rounded bg-neutral-300 focus:outline-none my-1 py-1 px-2 cursor-pointer bg-vermelhoBotao text-white mt-20" />
                    </div>
                </form>

                
            </section>

            <section className="w-1/2 h-screen flex items-center justify-center">

                <div className="flex flex-col items-center justify-center w-auto h-auto space-y-5">
                    <div className="space-y-5">
                        <Input nome="Nome" tipo="text" habilitar={posicao} value={loginCadastrar} onChange={(e) => setLoginCadastrar(e.target.value)} />
                        <Input nome="Email" tipo="text" habilitar={posicao} value={emailCadastrar} onChange={(e) => setEmailCadastrar(e.target.value)} />
                        <Input nome="Senha" tipo="password" habilitar={posicao} value={senhaCadastrar} onChange={(e) => setSenhaCadastrar(e.target.value)} />
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-10">
                        <div className="text-azulLink text-sm">
                            <p className="cursor-pointer hover:underline" onClick={mudarCard}>Já tenho uma conta</p>
                        </div>

                        <input type="submit" name="cadastrar" value="Cadastrar" onClick={checarCadastro} className="rounded bg-neutral-300 focus:outline-none my-1 py-1 px-2 cursor-pointer bg-vermelhoBotao text-white" />

                        <p>{ erro }</p>
                    </div>
                </div>

                
            </section>
            
            <ImageCard posicao={posicao} />

            <PopUp abrir={popUpAbrir} fechar={popUpCadastro}>

                <h2 className="mb-5">Insira o login de adm para cadastrar</h2>

                <Input nome="Login" tipo="text" habilitar={!popUpAbrir} value={login} onChange={(e) => setLogin(e.target.value) } />
                <Input nome="Senha" tipo="password" habilitar={!popUpAbrir} value={senha} onChange={(e) => setSenha(e.target.value) } />

                <input type="submit" name="login" value="Login" onClick={cadastrar} className="rounded bg-neutral-300 focus:outline-none my-1 py-1 px-2 cursor-pointer bg-vermelhoBotao text-white my-4" />
            </PopUp>

        </div>
    )

}