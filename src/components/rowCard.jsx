
export function RowCard({id_sensor, localizacao, responsavel, tipo, funcao}){

    return(
        <div className="flex w-8/10 h-auto gap-10 border border-vermelhoBotao py-4 px-10 rounded-3xl justify-between cursor-pointer" onClick={funcao}>

            <p>Id: {id_sensor}</p>
            <p>Localização: {localizacao}</p>
            <p>Responsavel: {responsavel}</p>
            <p>Tipo: {tipo}</p>

        </div>
    )


}