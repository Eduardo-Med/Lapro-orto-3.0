import generador from 'generate-password'

export function generarContrasena(){
    var password = generador.generate({
        length:14,
        numbers:true
    })
    return password
}
