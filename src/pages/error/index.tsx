import { Link } from "react-router-dom"

export function ErrorPage() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col text-white">
            <h1 className="font-bold text-6xl mb-2">404</h1>
            <h1 className="font-bold text-4xl mb-4">Pagina não encontrada</h1>
            <p className="italic text-1xl mb-4">Você caiu em uma página que não existe!</p>

            <Link className="bg-gray-50/20 py-1 px-4 rounded-md" to='/'>Voltar para Home</Link>

        </div>
    )
}