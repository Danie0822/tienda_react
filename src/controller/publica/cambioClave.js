import useApi from '../utilis/useApi';
import validaciones from '../utilis/validaciones';
import { calculateAndLogSha256 } from '../utilis/sha256';
// funcion para registrar un cliente
export const useCambioClave = () => {
    const { sendData } = useApi();

    const UpdateClave = async (email, password, passwordCo) => {
        try {
            const validacion = await validarDatos(password, passwordCo);
            if (validacion !== true) {
                return { success: false, message: validacion };
            }

            const hashedPassword = await calculateAndLogSha256(password);

            const formData = {
                correo_cliente: email,
                clave_cliente: hashedPassword
            };

            const { success, data } = await sendData("/cliente/update/cliente/clave", 'PUT', formData);
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
    const validarDatos = async (password, passwordCo) => {
        if (!validaciones.validarContra(password)) {
            return "La contraseña debe tener al menos 8 caracteres.";
        }
        if (!validaciones.validarConfirmacionContrasena(password, passwordCo)) {
            return "La contraseña y la confirmación de la contraseña no coinciden.";
        }
        return true;
    };

    return { UpdateClave };
};
