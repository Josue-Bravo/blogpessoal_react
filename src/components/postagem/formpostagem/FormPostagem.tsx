import { useState, useContext, useEffect, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface FormPostagemProps {
    isOpen: boolean
    onClose: () => void
    id?: number
}

function FormPostagem({ isOpen, onClose, id }: FormPostagemProps) {

    const navigate = useNavigate()

    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)
    const [temas, setTemas] = useState<Tema[]>([])

    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (isOpen) {
            buscarTemas()
        }
    }, [isOpen])

    useEffect(() => {
        if (id !== undefined && isOpen) { // 👈 adiciona isOpen como condição
        buscarPorId(id)
    }
    }, [id, isOpen])

    useEffect(() => {
        if (!isOpen) {
            setPostagem({} as Postagem)
            setIsFetching(false)
        }
    }, [isOpen])

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarPorId(id: number) {
        setIsFetching(true)
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsFetching(false)
        }
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value
        })
    }

    function atualizarTema(e: ChangeEvent<HTMLSelectElement>) {
        setPostagem({
            ...postagem,
            tema: { id: Number(e.target.value) } as Tema
        })
    }

    async function gerarNovaPostagem(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        // 👇 adiciona o usuário SEM alterar o estado original
        const postagemComUsuario = {
            ...postagem,
            usuario: {
                id: usuario.id
            }
        }

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagemComUsuario, setPostagem, {
                    headers: { Authorization: token }
                })
                ToastAlerta('A Postagem foi atualizada com sucesso!', 'sucesso')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao atualizar a postagem.', 'erro')
                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, postagemComUsuario, setPostagem, {
                    headers: { Authorization: token }
                })
                ToastAlerta('A Postagem foi cadastrada com sucesso!', 'sucesso')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao cadastrar a postagem.', 'erro')
                }
            }
        }

        setIsLoading(false)
        onClose()
    }

    if (!isOpen) return null

    return (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">

                <div className="flex items-center justify-between px-6 py-4 bg-indigo-800">
                    <h1 className="text-2xl font-bold text-white">
                        {id === undefined ? '✍️ Nova Postagem' : '✏️ Editar Postagem'}
                    </h1>
                    <button
                        onClick={onClose}
                        className="text-indigo-200 hover:text-white text-2xl font-bold transition-colors">
                        ✕
                    </button>
                </div>

                {isFetching ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                        <ClipLoader color="#4338ca" size={40} />
                        <p className="text-slate-500 text-sm">Carregando postagem...</p>
                    </div>
                ) : (
                    <form className="flex flex-col gap-4 p-6" onSubmit={gerarNovaPostagem}>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-slate-600">Título</label>
                            <input
                                type="text"
                                placeholder="Digite o título da postagem"
                                name="titulo"
                                className="border-2 border-slate-200 focus:border-indigo-400 rounded-lg p-2.5 outline-none transition-colors"
                                value={postagem.titulo ?? ''}
                                onChange={atualizarEstado}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-slate-600">Texto</label>
                            <textarea
                                placeholder="Escreva o conteúdo da postagem"
                                name="texto"
                                rows={5}
                                className="border-2 border-slate-200 focus:border-indigo-400 rounded-lg p-2.5 outline-none transition-colors resize-none"
                                value={postagem.texto ?? ''}
                                onChange={atualizarEstado}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-slate-600">Tema</label>
                            <select
                                name="tema"
                                className="border-2 border-slate-200 focus:border-indigo-400 rounded-lg p-2.5 outline-none transition-colors"
                                onChange={atualizarTema}
                                defaultValue="">
                                <option value="" disabled>Selecione um tema</option>
                                {temas.map(tema => (
                                    <option key={tema.id} value={tema.id}>
                                        {tema.descricao}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3 mt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-1/2 py-2.5 rounded-lg border-2 border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors font-semibold">
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 py-2.5 rounded-lg text-white bg-indigo-500 hover:bg-indigo-800 transition-colors font-semibold flex justify-center">
                                {isLoading ?
                                    <ClipLoader color="#ffffff" size={24} />
                                    :
                                    <span>Confirmar</span>
                                }
                            </button>
                        </div>
                    </form>
                )}

            </div>
        </div>
    )
}

export default FormPostagem