import React from "react"
import { useCookies } from 'react-cookie';
import PaginaPermiso from '../pages/PaginaPermiso'

export const accessControlNone = (WrappepComponent) =>{
    const SecuredControl = ({...props})=>{ 
        const [cookies] = useCookies(['cookie-name']);
        if(cookies.token){
            return <PaginaPermiso></PaginaPermiso>
        }else{
                return <div><WrappepComponent {...props} /></div>
        }
    }
    return SecuredControl
}