import AsyncStorage from '@react-native-async-storage/async-storage';
import apiConfig from '../utilis/apiConfig';
// valoraciones.js
import useApi from '../utilis/useApi';

const useValoraciones = () => {
    const { sendData } = useApi();

    const validarCalificacion = (calificacion) => {
        return Number.isInteger(calificacion);
    };

    const validarComentario = (comentario) => {
        const regex = /^[A-Za-z\s]+$/; // solo letras y espacios
        return regex.test(comentario) && comentario.length <= 100;
    };

    const valoracionesSave = async (calificacion_producto, comentario_producto, fecha_valoracion, estado_comentario, id_detalle_pedido) => {
        try {
            if (!validarCalificacion(calificacion_producto)) {
                throw new Error("La calificación debe ser un número entero.");
            }

            if (!validarComentario(comentario_producto)) {
                throw new Error("El comentario debe contener solo letras y no puede exceder los 100 caracteres.");
            }

            const data = {
                calificacion_producto,
                comentario_producto,
                fecha_valoracion,
                estado_comentario,
                id_detalle_pedido
            };

            const response = await sendData(`/public/valoraciones/save`, 'POST', data);

            if (response.status === 200) {
                console.log("Valoración guardada exitosamente.");
                return { success: true, message: "Valoración guardada exitosamente." };
            } else {
                console.error("Error al guardar la valoración:", response.statusText);
                return { success: false, message: "Error al guardar la valoración." };
            }
        } catch (error) {
            console.error("Error al guardar la valoración:", error.message);
            return { success: false, message: error.message };
        }
    };

    return {
        valoracionesSave
    };
};

export default useValoraciones;
