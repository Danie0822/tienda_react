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
    const [selectedValue, setSelectedValue] = useState("method1");
    const [carrito, setCarrito] = useState([]);
    const {infoCarrito } = fetchInfoCarrito()

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
                    img: baseURL+carrito.imagen_produc,
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

    useEffect(() => {
        fetchData();
    }, []);

    const renderCarrito = ({ item }) => (
        <CardCarrito
        producto={item.prod}
        marca={item.marc}
        total={item.tot}
        cantidad={item.cant}
        imagen={item.img}
        />
    );

    return (
        <View style={styles.container}>
            <CustomFlecha />
            <Text style={styles.title}>Carrito</Text>
            <FlatList
                data={carrito}
                renderItem={renderCarrito}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.list}
            />

            <View style={styles.bottomContainer}>
                <Picker
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Direccion 1" value="method1" />
                    <Picker.Item label="Direccion 2" value="method2" />
                    <Picker.Item label="Direccion 3" value="method3" />
                </Picker>
                <View style={styles.pagos}>
                    <View style={styles.summary}>
                        <Text style={styles.summaryText}>Total</Text>
                        <Text style={styles.summaryPrice}>$255.00</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton text="Ir a pagar" />
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
    clearButton: {
        position: 'absolute',
        right: 20,
        top: 95,
    },
    clearButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    itemBrand: {
        fontSize: 14,
        color: '#777',
    },
    priceQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#777',
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
    removeButton: {
        backgroundColor: '#FF0000',
        borderRadius: 5,
        padding: 5,
        marginLeft: 10,
    },
});

export default Carrito;
