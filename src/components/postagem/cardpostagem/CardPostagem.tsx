import type Postagem from "../../../models/Postagem"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface CardPostagemProps {
    postagem: Postagem
    onEditar: (id: number) => void
}

function CardPostagem({ postagem, onEditar }: CardPostagemProps) {

    console.log("POSTAGEM:", postagem)

    function isValidUrl(url?: string) {
        if (!url) return false
        try {
            new URL(url)
            return true
        } catch {
            return false
        }
    }

    return (
        <div className='border border-slate-200 flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 bg-white'>

            <header className='py-3 px-6 bg-linear-to-r from-indigo-600 to-indigo-800 text-white font-semibold text-lg tracking-wide'>
                Postagem
            </header>

            {/* USUÁRIO */}
            <div className="flex items-center gap-4 bg-slate-50 px-6 py-4">
                <img
                    src={
                        isValidUrl(postagem.usuario?.foto)
                            ? postagem.usuario?.foto
                            : `https://ui-avatars.com/api/?name=${postagem.usuario?.nome}&background=6366f1&color=fff`
                    }
                    alt={postagem.usuario?.nome}
                    onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${postagem.usuario?.nome}&background=6366f1&color=fff`
                    }}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                />
                <h2 className='text-lg font-semibold text-slate-800'>
                    {postagem.usuario?.nome}
                </h2>
            </div>

            {/* CONTEÚDO */}
            <div className="flex flex-col gap-2 px-6 py-4">

                <h3 className='text-xl font-bold text-slate-800'>
                    {postagem.titulo}
                </h3>

                <span className='w-fit text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full'>
                    {postagem.tema?.descricao}
                </span>

                <p className='text-sm text-slate-600 line-clamp-3'>
                    {postagem.texto}
                </p>

                <span className='text-xs text-gray-400 mt-2'>
                    Postado há {formatDistanceToNow(new Date(postagem.data), { locale: ptBR })}
                </span>
            </div>

            {/* BOTÕES */}
            <div className="flex border-t">
                <Link
                    to="#"
                    onClick={() => onEditar(postagem.id)}
                    className='w-full text-white bg-indigo-500 hover:bg-indigo-700 flex items-center justify-center py-2 text-sm font-medium transition-colors'>
                    Editar
                </Link>

                <Link
                    to={`/deletarpostagem/${postagem.id}`}
                    className='w-full text-white bg-red-500 hover:bg-red-700 flex items-center justify-center py-2 text-sm font-medium transition-colors'>
                    Deletar
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem