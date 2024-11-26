import card from '../../public/img/card.jfif'

export function ImageCard({ posicao }){

    return(
        <img src={card} alt="imagem" className={`h-screen w-1/2 absolute transition-all duration-1000 right-0 ${posicao? 'translate-x-0' : '-translate-x-full'}`} />
    )
    
}