import { useContext} from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate();

    //Consumo do contexto AuthContext
    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout();
        ToastAlerta("O Usuario foi desconectado com sucesso!", "sucess")
        navigate("/")
    }

    if (usuario.token === "") {
        return null
    } else {
        return (
            <>
                <div className='bg-indigo-900 w-full flex justify-center py-4 text-white'>

                    <div className='container flex justify-between text-lg mx-8'>
                        <Link to="/home" className="text-2xl font-bold">
                            Blog Pessoal
                        </Link>
                        <div className='flex gap-4'>
                            <Link to="/postagens" className="hover:underline">Postagens</Link>
                            <Link to="/temas" className="hover:underline">Temas</Link>
                            <Link to="/cadastrartema" className="hover:underline">Cadastrar Tema</Link>
                            <Link to="/perfil" className="hover:underline">Perfil</Link>
                            <Link to='' onClick={logout} className=" transition-colors duration-200 hover:text-blue-200 hover:underline">
                                Sair
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Navbar