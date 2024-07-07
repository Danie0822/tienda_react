import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import CustomFlecha from '../components/regresar';
import CustomButton from '../components/customButton';

const { width, height } = Dimensions.get('window');

const Carrito = ({ }) => {
    const [cantidad, setCantidad] = useState(1);

    const incrementar = () => setCantidad(cantidad + 1);
    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    return (
        <View style={styles.container}>
            <CustomFlecha />
            <Text style={styles.title}>Carrito</Text>
            <TouchableOpacity style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Eliminar todos</Text>
            </TouchableOpacity>
            <View style={styles.itemContainer}>
                <Image source={require('../img/gucci.jpg')} style={styles.image} />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>CHLOÉ SIGNATURE</Text>
                    <Text style={styles.itemBrand}>Chloé</Text>
                    <View style={styles.priceQuantityContainer}>
                        <Text style={styles.itemPrice}>$56.00</Text>
                        <Text style={styles.itemQuantity}>Cantidad: {cantidad}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.itemContainer}>
                <Image source={require('../img/gucci.jpg')} style={styles.image} />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>GOOD GIRL BLUSH</Text>
                    <Text style={styles.itemBrand}>Carolina Herrera</Text>
                    <View style={styles.priceQuantityContainer}>
                        <Text style={styles.itemPrice}>$99.95</Text>
                        <Text style={styles.itemQuantity}>Cantidad: {cantidad}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.pagos}>
                    <View style={styles.summary}>
                        <Text style={styles.summaryText}>Subtotal</Text>
                        <Text style={styles.summaryPrice}>$155.95</Text>
                    </View>
                    <View style={styles.summary}>
                        <Text style={styles.summaryText}>Costo de envío</Text>
                        <Text style={styles.summaryPrice}>$0.00</Text>
                    </View>
                    <View style={styles.summary}>
                        <Text style={styles.summaryText}>Total</Text>
                        <Text style={styles.summaryPrice}>$155.95</Text>
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
