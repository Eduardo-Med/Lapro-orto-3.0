import React from "react"
import { useCookies } from 'react-cookie';

export const accessControlNone = (WrappepComponent) =>{
    const SecuredControl = ({...props})=>{ 
        const [cookies] = useCookies(['cookie-name']);
        if(cookies.token){
            return (<div>No tiene Acceso a esta pagina</div>)
        }else{
                return <div><WrappepComponent {...props} /></div>
        }
    }
    return SecuredControl
}