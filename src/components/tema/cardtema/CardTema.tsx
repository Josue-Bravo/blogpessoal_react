import { Link } from "react-router-dom";
import type Tema from "../../../models/Tema";

interface CardTemaProps {
    tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
    return (
        <div className='shadow-2xl flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-3 px-6 bg-linear-to-r from-indigo-600 to-indigo-800 text-white font-semibold text-lg tracking-wide'>Tema</header>
            <p className='p-8 text-3xl bg-slate-100 h-full'>{tema.descricao}</p>

            <div className="flex border-t">
                <Link to={`/editartema/${tema.id}`}
                    className='w-full text-white bg-indigo-500 hover:bg-indigo-700 flex items-center justify-center py-2 text-sm font-medium transition-colors'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletartema/${tema.id}`} className='w-full text-white bg-red-500 hover:bg-red-700 flex items-center justify-center py-2 text-sm font-medium transition-colors' >
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardTema