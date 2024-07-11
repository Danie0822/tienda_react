import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CardCarrito = ({ producto, marca, imagen, total, cantidad, onRemove }) => {
    return (
        <View style={styles.itemContainer}>
            <Image source={{ uri: imagen }} style={styles.image} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{producto}</Text>
                <Text style={styles.itemBrand}>{marca}</Text>
                <View style={styles.priceQuantityContainer}>
                    <Text style={styles.itemPrice}>{total}</Text>
                    <Text style={styles.itemQuantity}>Cantidad: {cantidad}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
                <Icon name="trash" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
    removeButton: {
        backgroundColor: '#FF0000',
        borderRadius: 5,
        padding: 5,
        marginLeft: 10,
    },
});

export default CardCarrito;
