import React from 'react';
import logo from '../../public/logo.svg'
import sair from '../../public/img/sair.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SobreNos } from '../components/sobreNos';




export function Home(){

    const navigate = useNavigate();

    const [tela, setTela] = useState('sobreNos')

    const deslogar = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('login')
        navigate('/login')
    }


    return(
        <div className='flex'>
            <nav className="flex flex-col h-screen w-1/6 bg-primary-300 border-vermelhoBotao border-r-2">

                <div className='flex items-center w-auto h-auto m-0'>
                    <img src={logo} alt="logo" className="w-1/2 mx-auto" onClick={() => navigate('/home')} />
                </div>

                <ul className='mt-4'>
                    <li className={`itens-menu ${tela === 'sobreNos'? 'bg-vermelhoBotao text-white rounded-l-full ml-10' : 'itens-menu-hover'}`} onClick={() => {setTela('sobreNos')}}>Sobre nos</li>
                    <li className={`itens-menu ${tela === 'dashboard'? 'bg-vermelhoBotao text-white rounded-l-full ml-10' : 'itens-menu-hover'}`} onClick={() => {setTela('dashboard')}}>Dashboard</li>
                    <li className={`itens-menu ${tela === 'sensores'? 'bg-vermelhoBotao text-white rounded-l-full ml-10' : 'itens-menu-hover'}`} onClick={() => {setTela('sensores')}}>Sensores</li>
                    <li className={`itens-menu ${tela === 'tabelaSensores'? 'bg-vermelhoBotao text-white rounded-l-full ml-10' : 'itens-menu-hover'}`} onClick={() => {setTela('tabelaSensores')}}>Tabela sensores</li>
                </ul>

                <div className='flex items-center w-full h-12 bg-neutral-300 mt-auto'>
                    <p className='ml-5 text-lg'>{localStorage.getItem('login')}</p>

                    <button className='flex items-center w-auto h-auto ml-auto mr-2' onClick={deslogar}>
                        <img src={sair} alt="" className='w-6 h-6' />
                    </button>
                    
                </div>

            </nav>

            <section className='h-screen w-5/6'>

                {tela === 'sobreNos'? <SobreNos /> : null}
                {tela === 'dashboard'? <p>Dashboard</p> : null}
                {tela === 'sensores'? <p>ola</p> : null}
                {tela === 'tabelaSensores'? <p>Tabela sensores</p> : null}
            </section>

        </div>
    )

}