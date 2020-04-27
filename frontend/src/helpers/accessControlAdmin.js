import React from "react"

import { useCookies } from 'react-cookie';



export const accessControlAdmin = (WrappepComponent) =>{
    const SecuredControl = ({...props})=>{ 
        const [cookies] = useCookies(['cookie-name']);
        if(!cookies.token){
            return (<div>No tiene Acceso a esta pagina</div>)
        }else{
            console.log(cookies.tipoUsuario)
            if(cookies.tipoUsuario === 'Admin'){
                return <div><WrappepComponent {...props} /></div>
            }else{
                return (<div>No tiene Acceso de usuario para usar esta pagina</div>)
            }   
        }
    }
    return SecuredControl
}