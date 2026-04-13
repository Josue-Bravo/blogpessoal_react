import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function Footer() {

    //Consumo do contexto AuthContext
    const { usuario } = useContext(AuthContext)



    let data = new Date().getFullYear()

    if (usuario.token !== ""){
        return (
        <>
            <div className='flex justify-center bg-indigo-900 text-white'>
                <div className='container flex flex-col items-center py-4'>
                    <p className='text-xl font-bold'>
                        Blog Pessoal Generation | Copyrigth: {data}
                    </p>
                    <p className='text-lg'>Acesse nossas rede sociais</p>
                    <div className='flex gap-2'>
                        <LinkedinLogoIcon size={48} weight='bold' />
                        <InstagramLogoIcon size={48} weight='bold' />
                        <FacebookLogoIcon size={48} weight='bold' />
                    </div>
                </div>

            </div>
        </>
    )} else {
        return null
    }
    
}

export default Footer
