import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Postagem from "../../../models/Postagem"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarPostagem() {
    const navigate = useNavigate()
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'erro')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined && token !== '') {
            buscarPorId(id)
        }
    }, [id, token])

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function deletarPostagem() {
        if (!id) return 

        setIsLoading(true)
        try {
            await deletar(`/postagens/${id}`, {
                headers: { Authorization: token }
            })
            ToastAlerta('Postagem apagada com sucesso', 'sucesso')
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar a postagem.', 'erro')
            }
        }
        setIsLoading(false)
        navigate('/postagens')
    }

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
        <div className='container max-w-lg mx-auto px-4'>

            <h1 className='text-3xl text-center my-6 font-bold text-slate-800'>
                Deletar Postagem
            </h1>

            <p className='text-center text-slate-600 mb-6'>
                Você tem certeza de que deseja apagar a postagem a seguir?
            </p>

            {/* LOADING INICIAL */}
            {!postagem.id ? (
                <div className="flex justify-center">
                    <ClipLoader color="#4f46e5" />
                </div>
            ) : (

                <div className='border border-slate-200 flex flex-col rounded-2xl overflow-hidden shadow-md bg-white'>

                    <header className='py-3 px-6 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold text-lg'>
                        Confirmação de Exclusão
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
                            {postagem.usuario?.nome || "Usuário"}
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
                        <button
                            className='w-full text-white bg-slate-400 hover:bg-slate-600 py-2 text-sm font-medium transition-colors'
                            onClick={() => navigate('/postagens')}>
                            Cancelar
                        </button>

                        <button
                            className='w-full text-white bg-red-500 hover:bg-red-700 flex items-center justify-center py-2 text-sm font-medium transition-colors'
                            onClick={deletarPostagem}>
                            {isLoading ?
                                <ClipLoader color="#ffffff" size={20} />
                                :
                                <span>Deletar</span>
                            }
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DeletarPostagem