import React from "react"
import { useCookies } from 'react-cookie';

export const accessControlDentisa = (WrappepComponent) =>{
    const SecuredControl = ({...props})=>{ 
        const [cookies] = useCookies(['cookie-name']);
        console.log(cookies.tipoUsuario)
        if(!cookies.token){
            return (<div>No tiene Acceso a esta pagina</div>)
        }else{
            if(cookies.tipoUsuario === 'Dentista'){
                return <div><WrappepComponent {...props} /></div>
            }else{
                return (<div>No tiene Acceso de usuario para usar esta pagina</div>)
            }   
        }
    }
    return SecuredControl
}