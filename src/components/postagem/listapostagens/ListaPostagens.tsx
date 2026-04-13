import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import CardPostagem from "../cardpostagem/CardPostagem";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import FormPostagem from "../formpostagem/FormPostagem";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaPostagens() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagens, setPostagens] = useState<Postagem[]>([])
    const [modalAberto, setModalAberto] = useState<boolean>(false)
    const [idEditando, setIdEditando] = useState<number | undefined>(undefined)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [])

    async function buscarPostagens() {
        try {
            setIsLoading(true)
            setPostagens([])
            await buscar('/postagens', setPostagens, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    function abrirParaCadastro() {
        setIdEditando(undefined)
        setModalAberto(true)
    }

    function abrirParaEdicao(id: number) {
        setIdEditando(id)
        setModalAberto(true)
    }

    return (
        <>
            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader color="#312e81" size={32} />
                </div>
            )}

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">

                    {(!isLoading && postagens.length === 0) && (
                        <span className="text-3xl text-center my-8">
                            Nenhuma Postagem foi encontrada!
                        </span>
                    )}

                    <div className="flex justify-end mb-4">
                        <button
                            onClick={abrirParaCadastro}
                            className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 px-6 py-2 cursor-pointer">
                            Nova Postagem
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {postagens.map((postagem) => (
                            <CardPostagem
                                key={postagem.id}
                                postagem={postagem}
                                onEditar={abrirParaEdicao}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <FormPostagem
                isOpen={modalAberto}
                onClose={() => { setModalAberto(false); buscarPostagens() }}
                id={idEditando}
            />
        </>
    )
}

export default ListaPostagens