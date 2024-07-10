import useApi from '../utilis/useApi';


// Función para registrar un cliente
export const DeleteDirrecion = () => {
  const { deleteData } = useApi();

  const DirrecionDelete = async (id) => {
    try {
      const idNumero = parseInt(id);
      const { success, data } = await deleteData(`/dirreciones/delete/${idNumero}`);
      if (success) {
        return { success: true };
      } else {
        const errorMessage = data && data.message ? data.message : "Error registro esta en uso.";
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error en conexión" };
    }
  };


  return { DirrecionDelete };
};
