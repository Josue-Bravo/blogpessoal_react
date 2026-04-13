import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { buscar } from "../../services/Service"
import type Postagem from "../../models/Postagem"
import CardPostagem from "../../components/postagem/cardpostagem/CardPostagem"
import FormPostagem from "../../components/postagem/formpostagem/FormPostagem"
import { SyncLoader } from "react-spinners"

function Home() {

    const [modalAberto, setModalAberto] = useState(false)
    const [idEditando, setIdEditando] = useState<number | undefined>(undefined)
    const [postagens, setPostagens] = useState<Postagem[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false)


    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token !== '') {
            buscarPostagens()
        }
    }, [token])

    async function buscarPostagens() {
        try {
            setIsLoading(true)
            setPostagens([]) // 👈 limpa aqui
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

    function abrirParaEdicao(id: number) {
        setIdEditando(id)
        setModalAberto(true)
    }

    const tresUltimas = postagens.slice(-3).reverse().slice(0, 3)

    return (
        <>
            <section className="bg-indigo-900 flex justify-center">
                <article className="container grid grid-cols-1 md:grid-cols-2 text-white">

                    <div className="flex flex-col justify-center items-center gap-4">
                        <h2 className="text-5xl font-bold">Seja Bem-Vindo!</h2>
                        <p className="text-xl">Expresse aqui seus pensamentos e opiniões</p>
                        <button
                            onClick={() => { setIdEditando(undefined); setModalAberto(true) }}
                            className="rounded border-white border-solid border-2 py-2 px-4 hover:border-indigo-100 hover:bg-indigo-600">
                            Nova Postagem
                        </button>
                    </div>

                    <figure className="flex justify-center">
                        <img
                            src="https://i.imgur.com/fyfri1v.png"
                            alt="Imagem Página Home"
                            className="w-2/3"
                        />
                    </figure>

                </article>
            </section>


            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader color="#312e81" size={32} />
                </div>
            )}

            {(!isLoading && postagens.length === 0) && (
                <span className="text-3xl text-center my-8 h-full">
                    Nenhuma Postagem foi encontrada!
                </span>
            )}


            {/* 3 POSTAGENS MAIS RECENTES */}
            {tresUltimas.length > 0 && (
                <section className="flex justify-center w-full my-8">
                    <div className="container flex flex-col gap-4">
                        <h2 className="text-2xl font-bold text-slate-800">
                            Postagens Recentes
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tresUltimas.map(postagem => (
                                <CardPostagem
                                    key={postagem.id}
                                    postagem={postagem}
                                    onEditar={abrirParaEdicao}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <FormPostagem
                isOpen={modalAberto}
                onClose={() => { setModalAberto(false); buscarPostagens() }}
                id={idEditando}
            />
        </>
    )
}

export default Home