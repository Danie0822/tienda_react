import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomFlecha from '../components/regresar';
import CustomButton from '../components/customButton';
import CardCarrito from '../components/cardCarrito';
import { fetchInfoCarrito } from '../controller/publica/carritoController';
import apiConfig from '../controller/utilis/apiConfig';

const baseURL = apiConfig.getBaseURL2();

const { width } = Dimensions.get('window');

const Carrito = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [carrito, setCarrito] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [direcciones, setDirecciones] = useState([]);
    const { infoCarrito, infoTotal, deleteCarrito, obtenerDirecciones, finalizarPedido, handleDireccionChange } = fetchInfoCarrito();
    const asd = async(algo) => { 
        console.log(algo);
    }
    const fetchData = async () => {
        try {
            const response = await infoCarrito();
            if (response.success) {
                const filteredData = response.data.map(carrito => ({
                    id: carrito.id_cliente,
                    id_p: carrito.id_pedido,
                    id_dp: carrito.id_detalle_pedido,
                    prod: carrito.producto,
                    cant: carrito.cantidad,
                    marc: carrito.marca,
                    img: baseURL + carrito.imagen_produc,
                    tot: carrito.total,
                }));
                setCarrito(filteredData);
            } else {
                Alert.alert('Error al cargar:', 'No se pudo cargar la información del cliente.');
            }
        } catch (error) {
            Alert.alert('Error al cargar', error.message);
        }
    };

    const fetchData2 = async () => {
        try {
            const response = await infoTotal();
            if (response.success) {
                const totalData = response.data.reduce((acc, curr) => acc + curr.total_pago, 0);
                setTotalAmount(totalData);
            } else {
                Alert.alert('Error al cargar:', 'No se pudo cargar la información del cliente.');
            }
        } catch (error) {
            Alert.alert('Error al cargar', error.message);
        }
    };

    const fetchDataCombo = async () => {
        try {
            const response = await obtenerDirecciones();
            if (response.success) {
                setDirecciones(response.data);
                console.log(response.data);
                if (response.data.length > 0) {
                    setSelectedValue(response.data[0].id_direccion); // Selecciona la primera dirección por defecto
                    handleDireccionChange(response.data[0].id_direccion);
                }
            } else {
                Alert.alert('Error al cargar:', 'No se pudieron cargar las direcciones del cliente.');
            }
        } catch (error) {
            Alert.alert('Error al cargar', error.message);
        }
    };

    const handlePressEliminar = async (id_dp) => {
        const { success, message } = await deleteCarrito(id_dp);
        if (success) {
            Alert.alert("Registro exitoso", "Tu producto ha sido eliminado", [
                { text: "OK", onPress: () => fetchData() }
            ]);
        } else {
            Alert.alert("Error", message);
        }
    };

    useEffect(() => {
        fetchData();
        fetchData2();
        fetchDataCombo();
    }, []);

    const renderCarrito = ({ item }) => (
        <CardCarrito
            producto={item.prod}
            marca={item.marc}
            total={item.tot}
            cantidad={item.cant}
            imagen={item.img}
            onRemove={() => handlePressEliminar(item.id_dp)}
        />
    );

    const handlePagar = async () => {
        if (!selectedValue) {
            Alert.alert("Error", "No se ha seleccionado una dirección.");
            return;
        }

        const { success, message } = await finalizarPedido(selectedValue);
        if (success) {
            Alert.alert("Pedido finalizado", "Tu pedido ha sido finalizado correctamente", [
                { text: "OK" }
            ]);
        } else {
            Alert.alert("Error", message);
        }
    };

    return (
        <View style={styles.container}>
            <CustomFlecha />
            <Text style={styles.title}>Carrito</Text>
            <FlatList
                data={carrito}
                renderItem={renderCarrito}
                keyExtractor={item => item.id_dp.toString()}
                contentContainerStyle={styles.list}
            />

            <View style={styles.bottomContainer}>
                <Picker
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        setSelectedValue(itemValue);
                        handleDireccionChange(itemValue);
                    }}
                >
                    {direcciones.map((direccion) => (
                        <Picker.Item key={direccion.id} label={direccion.nombre_direccion} value={direccion.id} />
                    ))}
                </Picker>
                <View style={styles.pagos}>
                    <View style={styles.summary}>
                        <Text style={styles.summaryText}>Total</Text>
                        <Text style={styles.summaryPrice}>${totalAmount.toFixed(2)}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton text="Ir a pagar" onPress={handlePagar} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
        paddingTop: 65,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    list: {
        flexGrow: 1,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    picker: {
        height: 50,
        width: width - 40,
        marginBottom: 20,
    },
    pagos: {
        marginVertical: 20,
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    summaryText: {
        fontSize: 16,
        color: '#777',
    },
    summaryPrice: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 5,
    },
});

export default Carrito;
