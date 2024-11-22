

export function Input({ nome }) {
    return (
        <div>
            <h2 className="font-sans text-xl" >{nome}</h2>
            <input type="text" className="rounded bg-neutral-300" />
        </div>
    )
}