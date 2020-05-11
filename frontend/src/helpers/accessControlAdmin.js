import React from "react"

import { useCookies } from 'react-cookie';
import PaginaPermiso from '../pages/PaginaPermiso'


export const accessControlAdmin = (WrappepComponent) =>{
    const SecuredControl = ({...props})=>{ 
        const [cookies] = useCookies(['cookie-name']);
        if(!cookies.token){
            return <PaginaPermiso></PaginaPermiso>
        }else{
            if(cookies.tipoUsuario === 'Admin'){
                return <div><WrappepComponent {...props} /></div>
            }else{
                return <PaginaPermiso></PaginaPermiso>
            }   
        }
    }
    return SecuredControl
}