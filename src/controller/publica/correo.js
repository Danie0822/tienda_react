import useApi from '../utilis/useApi';
import validaciones from '../utilis/validaciones';

// función para mandar un correo
export const useRegistrar = () => {
    const { sendData } = useApi();

    const enviarCorreo = async (correo, codigo) => {
        try {

            const formData = {
                destinatario: correo,
                codigoRecuperacion: codigo
            };

            const { success, data } = await sendData("/recuperaciones/enviar", 'POST', formData);
            if (success) {
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: "Credenciales inválidas" };
        }
    };

    // función para validar los datos del correo
    const validarDatos = async (correo, codigoRecu, codigoconfir) => {
        if (!validaciones.contieneSoloLetrasYNumeros(codigoRecu)) {
            return "Código no puede estar vacío y debe contener solo letras y números.";
        }
        if (!validaciones.validarCorreoElectronico(correo)) {
            return "El correo electrónico no tiene un formato válido.";
        }
        if (!validaciones.validarConfirmacionContrasena(codigoRecu, codigoconfir)) {
            return "La código no coincide. Intente de nuevo.";
        }
        return true;
    };

    return { enviarCorreo, validarDatos };
};
