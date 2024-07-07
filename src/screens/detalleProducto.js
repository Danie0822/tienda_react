import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomFlecha from '../components/regresar';
import CustomButton from '../components/customButton';

const { width, height } = Dimensions.get('window');

const DetalleProducto = ({ }) => {
    const [cantidad, setCantidad] = useState(1);
    const navigation = useNavigation();
    const incrementar = () => setCantidad(cantidad + 1);
    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };
    const handlePress = () => {
        navigation.navigate('Carrito');
    };

    return (
        <View style={styles.cont}>
            <CustomFlecha />
            <View style={styles.containerImg}>
                <Image source={require('../img/gucci.jpg')} style={styles.image} />
            </View>
            <View style={styles.container}>
                <Text style={styles.textTitulo}>CHLOÉ SIGNATURE</Text>
                <View style={styles.row}>
                    <Text style={styles.textMarca}>Chloé</Text>
                    <Text style={styles.textPrecio}>$100.95</Text>
                </View>
            </View>
            <View style={styles.detalles}>
                <View style={styles.detalleRow}>
                    <Text style={styles.categoria}>Categoría</Text>
                    <Text style={styles.dato}>Eau de parfum</Text>
                </View>
                <View style={styles.detalleRow}>
                    <Text style={styles.categoria}>Olor</Text>
                    <Text style={styles.dato}>Floral</Text>
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
                Chloé signature es una de las mejores fragancias de todos los tiempos, con su fragancia floral, tú mujer tendrás poder de lograrlo todo.
            </Text>
            <View style={styles.buttonContainer}>
            <CustomButton
                text="Agregar al carrito"
                onPress={handlePress}
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
    textPrecio: {
        fontSize: 22,
        color: '#EDD146',
        fontWeight: '500',
        textAlign: 'right',
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
