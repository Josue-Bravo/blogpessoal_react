import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
    const navigate = useNavigate();

    //Consumo do contexto AuthContext
    const { handleLogout } = useContext(AuthContext)

    function logout(){
        handleLogout();
        alert("O Usuario foi desconectado com sucesso!")
        navigate("/")
    }

    return (
        <>
            <div className='bg-indigo-900 w-full flex justify-center py-4 text-white'>

                <div className='container flex justify-between text-lg mx-8'>
                    <Link to="/home" className="text-2xl font-bold">
                        Blog Pessoal
                    </Link>
                    <div className='flex gap-4'>
                        Postagens
                        <Link to="/temas" className="hover:underline">Temas</Link>
                        <Link to="/cadastrartema" className="hover:underline">Cadastrar Tema</Link>
                        Perfil
                        <Link to='' onClick={logout} className=" transition-colors duration-200 hover:text-blue-200 hover:underline">
                            Sair
                        </Link>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar