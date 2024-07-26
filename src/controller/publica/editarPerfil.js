import useApi from '../utilis/useApi';
import validaciones from '../utilis/validaciones';
import AsyncStorage from '@react-native-async-storage/async-storage';
// funcion para registrar un cliente
export const usePerfil = () => {
  const { sendData } = useApi();
// funcion para registrar la edicion del cliente
  const registrarEdit = async (nombre, apellido, email, telefono) => {
    try {
      const validacion = await validarDatos(nombre, apellido, email, telefono);
      if (validacion !== true) {
        return { success: false, message: validacion };
      }
      const id = await AsyncStorage.getItem("id_cliente");
      const idNumero = parseInt(id);
      const formData = {
        id_cliente : idNumero,
        nombre_cliente: nombre,
        apellido_cliente: apellido,
        correo_cliente: email,
        telefono_cliente: telefono
      };

      const { success, data } = await sendData("/cliente/update/vali/cliente", 'PUT', formData);
      if (success) {
        await AsyncStorage.setItem("nombre_cliente", nombre);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Error en conexion" };
    }
  };
// funcion para validar los datos del cliente
  const validarDatos = async (nombre, apellido, email, telefono) => {
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
    return true;
  };

  return { registrarEdit };
};
