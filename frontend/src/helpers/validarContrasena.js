export function validarcontrasena(text) {
    var mayus = new RegExp("^(?=.*[A-Z])");
    var special = new RegExp("^(?=.*[!@#$&*.])");
    var numbers = new RegExp("^(?=.*[0-9])");
    var lower = new RegExp("^(?=.*[a-z])");
    let valor;
    // eslint-disable-next-line no-unused-vars
    var datos

    if (
      mayus.test(text) &&
      special.test(text) &&
      numbers.test(text) &&
      lower.test(text)
    ) {
      valor = 1;
    } else {
      valor = 0;
    }

    console.log(text.len)
    if (text.length >= 8 && valor === 1) {
      return datos={
        nivel: "Nivel de seguridad: alto",
        color: "green"
      }
    } else if (text.length>= 6 && valor === 1) {
      return datos={
        nivel: "Nivel de seguridad: medio",
        color: "#ef5e01"
      }
    } else if (text.length >= 5) {
      return datos={
        nivel: "Nivel de seguridad: bajo",
        color: "red"
      }
    } else if (text.length >= 1 && text.length <= 4) {
      return datos={
        nivel: "Contraseña invalida",
        color: "red"
      }
    } else {
      return datos={
        nivel: "",
        color:"white"
      }
    }
  }