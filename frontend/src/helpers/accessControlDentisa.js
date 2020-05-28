import React from "react"
import { useCookies } from 'react-cookie';
import PaginaPermiso from '../pages/PaginaPermiso'

export const accessControlDentisa = (WrappepComponent) =>{
    const SecuredControl = ({...props})=>{ 
        const [cookies] = useCookies(['cookie-name']);
        if(!cookies.token){
            return <PaginaPermiso></PaginaPermiso>
        }else{
            if(cookies.tipoUsuario === 'Dentista'){
                return <div><WrappepComponent {...props} /></div>
            }else{
                return <PaginaPermiso></PaginaPermiso>
            }   
        }
    }
    return SecuredControl
}

export const accessControlDentisaAdmin = (WrappepComponent) =>{
    const SecuredControl = ({...props})=>{ 
        const [cookies] = useCookies(['cookie-name']);
        if(!cookies.token){
            return <PaginaPermiso></PaginaPermiso>
        }else{
            if(cookies.tipoUsuario === 'Dentista' || cookies.tipoUsuario === 'Admin'){
                return <div><WrappepComponent {...props} /></div>
            }else{
                return <PaginaPermiso></PaginaPermiso>
            }   
        }
    }
    return SecuredControl
}