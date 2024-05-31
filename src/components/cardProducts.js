import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const CardProduct = ({ nombre, marca, precio, imagen }) => {

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('DetalleProducto');
    };

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
        <Image source={imagen} style={styles.image} />
        <View style={styles.textContainer}>
            <Text style={styles.productName}>{nombre}</Text>
            <Text style={styles.productBrand}>{marca}</Text>
            <Text style={styles.productPrice}>{precio}</Text>
        </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 2,
        marginBottom: 20,
        padding: 10,
        width: width / 2 - 30,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
    textContainer: {
        marginTop: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productBrand: {
        fontSize: 14,
        color: '#000',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#777',
        alignSelf:'flex-end',
        marginLeft: 4
    },
});

export default CardProduct;
