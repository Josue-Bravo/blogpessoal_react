import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import Cadastro from "./pages/cadastro/Cadastro"
import Login from "./pages/login/Login"
import { AuthProvider } from "./contexts/AuthContext"
import ListaTemas from "./components/tema/listatemas/ListaTemas"
import FormTema from "./components/tema/formtema/FormTema"
import DeletarTema from "./components/tema/deletartema/DeletarTema"
import DeletarPostagem from "./components/postagem/deletarpostagem/DeletarPostagem"
import ListaPostagens from "./components/postagem/listapostagens/ListaPostagens"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import Perfil from "./pages/perfil/Perfil"
import AtualizarPerfil from "./components/atualizarperfil/AtualizarPerfil"

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer/>
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/temas" element={<ListaTemas />} />
              <Route path="/cadastrartema" element={<FormTema />} />
              <Route path="/editartema/:id" element={<FormTema />} />
              <Route path="/deletartema/:id" element={<DeletarTema />} />
              <Route path="/postagens" element={<ListaPostagens />} />
              <Route path="/deletarpostagem/:id" element={<DeletarPostagem />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/atualizarusuario" element={<AtualizarPerfil />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App