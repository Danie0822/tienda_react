// src/utilis/validaciones.js
const validaciones = {
  esNumeroEntero: function (valor) {
    return /^\d+$/.test(valor);
  },
  esNumeroDecimal: function (valor) {
    return /^\d+(\.\d+)?$/.test(valor);
  },
  contieneSoloLetrasYNumeros: function (valor) {
    if (valor.trim() === "") {
      return false;
    }
    return /^[a-zA-Z0-9\s]*$/.test(valor);
  },
  validarContra: function (contrasena) {
    return contrasena.length >= 8;
  },
  validarCorreoElectronico: function (correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  },
  validarTelefono: function (telefono) {
    return /^\d{8}$/.test(telefono);
  },
  validarConfirmacionContrasena: function (contrasena, confirmacion) {
    return contrasena === confirmacion;
  },
  longitudMaxima: function (valor, maximo) {
    return valor.length >= 4 && valor.length <= maximo;
  },
};

export default validaciones;
