import useApi from '../utilis/useApi';
import validaciones from '../utilis/validaciones';
import { calculateAndLogSha256 } from '../utilis/sha256';
// funcion para registrar un cliente
export const useRegistrar = () => {
  const { sendData } = useApi();

  const registrarSave = async (nombre, apellido, email, telefono, password) => {
    try {
      const validacion = await validarDatos(nombre, apellido, email, telefono, password);
      if (validacion !== true) {
        return { success: false, message: validacion };
      }

      const hashedPassword = await calculateAndLogSha256(password);

      const formData = {
        nombre_cliente: nombre,
        apellido_cliente: apellido,
        correo_cliente: email,
        clave_cliente: hashedPassword,
        telefono_cliente: telefono,
        estado_cliente: true,
      };

      const { success, data } = await sendData("/cliente/save", 'POST', formData);
      if (success) {
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Credenciales inválidas" };
    }
  };
// funcion para validar los datos del cliente
  const validarDatos = async (nombre, apellido, email, telefono, password) => {
    if (!validaciones.contieneSoloLetrasYNumeros(nombre)) {
      return "Nombre no puede estar vacío y debe contener solo letras y números.";
    }
    if (!validaciones.longitudMaxima(nombre, 100)) {
      return "El nombre debe tener como máximo 100 caracteres.";
    }
    if (!validaciones.validarTelefono(telefono)) {
      return "Formato de teléfono inválido. Use el formato: 12345678";
    }
    if (!validaciones.contieneSoloLetrasYNumeros(apellido)) {
      return "Apellido no puede estar vacío y debe contener solo letras y números.";
    }
    if (!validaciones.longitudMaxima(apellido, 100)) {
      return "El apellido debe tener como máximo 100 caracteres.";
    }
    if (!validaciones.validarCorreoElectronico(email)) {
      return "El correo electrónico no tiene un formato válido.";
    }
    if (!validaciones.validarContra(password)) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }
    return true;
  };

  return { registrarSave };
};
