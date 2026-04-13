import axios from "axios";

// Cria nova instância do Axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Função para Cadastrar Usuario
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data);
}

// Função para Autenticar Usuario
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data);
}

// Função para consultar com Token
export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data);
}

// Função para Cadastrar um Objeto (neste caso, produto e tema)
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data);
}

// Função para Atualiza Usuario
export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data);
}

// Função para deletar Usuario
export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)
}
