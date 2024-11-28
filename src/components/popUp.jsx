
export function PopUp({ abrir, fechar, children }) {
    if (!abrir) return null

    return (
        <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
            <div className="flex flex-col rounded bg-white w-auto h-auto">

                <div className="flex justify-end h-auto">
                    <button className="rounded focus:outline-none cursor-pointer right-0 w-auto h-auto m-2 text-lg" onClick={fechar}>X</button>
                </div>

                <div className="flex flex-col items-center justify-center m-0 p-3">
                    {children}
                </div>

            </div>
            
        </div>
    )
}