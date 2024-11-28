
export function Input({ nome, tipo, habilitar, value, onChange }) {
    return (
        <div className="h-auto w-auto">
            <h2 className="font-sans text-xl" >{nome}</h2>
            <input type={tipo} className="rounded bg-neutral-300 focus:outline-none my-1 py-1 px-2" disabled={habilitar} value={value} onChange={onChange} />
        </div>
    )
}