import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon
import CustomFlecha from '../components/regresar';
import CustomButton from '../components/customButton';
import { fetchInfoCliente } from '../controller/publica/detalleProductoCotroller';
import { fetchInfoVal } from '../controller/publica/valoraciones';
import apiConfig from '../controller/utilis/apiConfig';

const baseURL = apiConfig.getBaseURL2();
const { width, height } = Dimensions.get('window');

const DetalleProducto = ({ }) => {
    const [cantidad, setCantidad] = useState(1);
    const [costo, setCosto] = useState(null);
    const [cantidadVal, setCantidadVal] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [valoracion, setValoracion] = useState(0); // Agrega estado para la valoración
    const navigation = useNavigation();
    const { infoProducto, agregarCarrito } = fetchInfoCliente();
    const { valoraciones } = fetchInfoVal();

    const fetchData = async () => {
        try {
            const response = await infoProducto();
            if (response.success) {
                const user = response.data[0];
                const imageUrl = `${baseURL}${user.imagen}`;
                setUserInfo({
                    nm: user.nombre,
                    mr: user.marca,
                    ct: user.categoria,
                    ol: user.olor,
                    pr: user.precio,
                    cat: user.cantidad,
                    ds: user.descripcion,
                    im: imageUrl,
                });
                setCosto(user.precio);
                setCantidadVal(user.cantidad); // Establecer el costo
            } else {
                Alert.alert('Error al cargar:', 'No se pudo cargar la información del cliente.');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error al cargar', error.message);
        }
    };

    const fetchDataValorarciones = async () => {
        try {
            const response = await valoraciones();
            if (response.success) {
                const user = response.data[0];
                setUserInfo(prevState => ({
                    ...prevState,
                    val: user.valoracion_calculada,
                }));
                setValoracion(user.valoracion_calculada); // Establecer la valoración
            } else {
                Alert.alert('Error al cargar:', 'No se pudo cargar la información del cliente.');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error al cargar', error.message);
        }
    };

    useEffect(() => {
        const fetchDataAsync = async () => {
            await fetchData();
            await fetchDataValorarciones();
        };
        fetchDataAsync();
    }, []);

    const incrementar = () => setCantidad(cantidad + 1);
    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const handlePress = () => {
        navigation.navigate('Carrito');
    };

    const handlePressCarrito = async () => {
        const { success, message } = await agregarCarrito(cantidad, costo, cantidadVal); // Pasar el costo aquí
        if (success) {
            Alert.alert("Agregado Exitoso", `Tus productos se han agregado al carrito. `, [
                { text: "OK", onPress: () => navigation.navigate('Carrito') }
            ]);
        } else {
            Alert.alert("Error", message);
        }
    };

    return (
        <View style={styles.cont}>
            <CustomFlecha />
            <View style={styles.containerImg}>
                {userInfo && <Image source={{ uri: `${userInfo.im}` }} style={styles.image} />}
            </View>
            <View style={styles.container}>
                <Text style={styles.textTitulo}>{(userInfo ? userInfo.nm : "")}</Text>
                <View style={styles.row}>
                    <Text style={styles.textMarca}>{userInfo ? userInfo.mr : ""}</Text>
                    <Text style={styles.textPrecio}>{"$" + (userInfo ? userInfo.pr : "")}</Text>
                </View>
                <View style={styles.starContainer}>
                    <Text style={styles.textValoracion}>{"Valoración"}</Text>
                    {[...Array(5)].map((_, index) => (
                        <Icon 
                            key={index} 
                            name={index < valoracion ? "star" : "star-o"} 
                            size={20} 
                            color={index < valoracion ? "#FFD700" : "#d3d3d3"} 
                        /> 
                    ))}
                </View>
            </View>
            <View style={styles.detalles}>
                <View style={styles.detalleRow}>
                    <Text style={styles.categoria}>Categoría</Text>
                    <Text style={styles.dato}>{userInfo ? userInfo.ct : ""}</Text>
                </View>
                <View style={styles.detalleRow}>
                    <Text style={styles.categoria}>Olor</Text>
                    <Text style={styles.dato}>{userInfo ? userInfo.ol : ""}</Text>
                </View>
                <View style={styles.cantidadRow}>
                    <Text style={styles.categoria}>Cantidad</Text>
                    <View style={styles.cantidadContainer}>
                        <TouchableOpacity style={styles.botonCantidad} onPress={decrementar}>
                            <Text style={styles.botonTexto}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.cantidadTexto}>{cantidad}</Text>
                        <TouchableOpacity style={styles.botonCantidad} onPress={incrementar}>
                            <Text style={styles.botonTexto}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Text style={styles.descripcion}>
                {userInfo ? userInfo.ds : "Cargando descripción..."}
            </Text>
            <View style={styles.buttonContainer}>
                <CustomButton
                    text="Agregar al carrito"
                    onPress={handlePressCarrito} // Llamar a la función handlePressCarrito
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cont: {
        backgroundColor: '#FFF',
        flex: 1,
    },
    container: {
        padding: 10,
        marginTop: 10,
        backgroundColor: '#FFF',
        alignItems: 'flex-start',
    },
    containerImg: {
        padding: 10,
        marginTop: 70,
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    image: {
        width: width * 0.6,
        height: width * 0.6,
        resizeMode: 'contain',
        marginBottom: 20,
        marginTop: 20,
    },
    textTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: '#000',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    textMarca: {
        fontSize: 18,
        color: '#777',
        fontWeight: '500',
        paddingLeft: 10,
        marginVertical: 5,
    },
    textValoracion: {
        fontSize: 18,
        color: '#777',
        fontWeight: '500',
        paddingLeft: 10,
        paddingRight: 10,
        marginVertical: 5,
    },
    textPrecio: {
        fontSize: 22,
        color: '#EDD146',
        fontWeight: '500',
        textAlign: 'right',
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5,
    },
    detalles: {
        padding: 13,
        marginVertical: 7,
    },
    detalleRow: {
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        padding: 10,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoria: {
        fontSize: 16,
        color: '#777',
        fontWeight: 'bold',
    },
    dato: {
        fontSize: 16,
        color: '#000',
    },
    descripcion: {
        fontSize: 16,
        color: '#777',
        marginLeft: 13,
        marginBottom: 12,
    },
    cantidadRow: {
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        padding: 10,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cantidadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botonCantidad: {
        backgroundColor: '#FFD700',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    botonTexto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    cantidadTexto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 5,
    },
});

export default DetalleProducto;
