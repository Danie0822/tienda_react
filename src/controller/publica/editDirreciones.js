import useApi from '../utilis/useApi';
import validaciones from '../utilis/validaciones';
import AsyncStorage from '@react-native-async-storage/async-storage';
// funcion para registrar un cliente
export const usePerfil = () => {
  const { sendData } = useApi();

  const registrarEdit = async (nombre, dirrecion, codigo_postal, telefono, instrucciones) => {
    try {
      const validacion = await validarDatos(nombre, dirrecion, codigo_postal, telefono, instrucciones);
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

      const { success, data } = await sendData("/dirreciones/update/cliente", 'PUT', formData);
      if (success) {
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Error en conexion" };
    }
  };
// funcion para validar los datos del cliente
const validarDatos = async (nombre, dirrecion, codigo_postal, telefono, instrucciones) => {
    if (!validaciones.contieneSoloLetrasYNumeros(nombre)) {
        return "Nombre no puede estar vacío y debe contener solo letras y números.";
    }
    if (!validaciones.longitudMaxima(nombre, 100)) {
        return "El nombre debe tener como máximo 100 caracteres.";
    }
    if (!validaciones.validarTelefono(telefono)) {
        return "Formato de teléfono inválido. Use el formato: 12345678";
    }
    if (!validaciones.contieneSoloLetrasYNumeros(dirrecion)) {
        return "dirrecion no puede estar vacío y debe contener solo letras y números.";
    }
    if (!validaciones.longitudMaxima(dirrecion, 100)) {
        return "La dirrecion debe tener como máximo 100 caracteres.";
    }
    if (codigo_postal.length > 5) {
        return "El codigo postal debe tener como máximo 5 caracteres.";
    }
    if (!validaciones.contieneSoloLetrasYNumeros(instrucciones)) {
        return "Instrucciones no puede estar vacío y debe contener solo letras y números.";
    }
    if (!validaciones.longitudMaxima(instrucciones, 100)) {
        return "Las instrucciones deben tener como máximo 100 caracteres.";
    }
    return true;
};

  return { registrarEdit };
};
