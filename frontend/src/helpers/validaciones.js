const validacionCorrecta =() =>{ return {validacion: true, mensajeError:''}}
const validacionIncorrecta = (mensajeError) => {return {validacion: false, mensajeError}}



export const soloTexto=(texto)=>{
    var numeros = new RegExp("^(?=.*[0-9])");
    return numeros.test(texto) ? validacionIncorrecta('Solo Se Permiten Letras') : validacionCorrecta()
}

export const soloNumero=(texto)=>{
    var letras = new RegExp("^(?=.*[a-z])");
    return letras.test(texto) ? validacionIncorrecta('Solo Se permiten numeros') : validacionCorrecta()
}

export const campoObligatorio=(texto)=>{
    if( texto === null || texto === NaN || /^\s+$/.test(texto) ) {
        return validacionIncorrecta('Campo Obligatorio')
    }
    return validacionCorrecta()
}



export const campoObligatorioyTexto=(texto)=>{
    if(!campoObligatorio(texto).validacion){
        return campoObligatorio(texto)
    }else if(!soloTexto(texto).validacion){
        return soloTexto(texto)
    }
    return validacionCorrecta()
}

export const campoObligatorioyNumero=(texto)=>{
    if(!campoObligatorio(texto).validacion){
        return campoObligatorio(texto)
    }else if(!soloNumero(texto).validacion){
        return soloNumero(texto)
    }
    return validacionCorrecta()
}






