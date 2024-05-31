import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, FlatList } from 'react-native';
import CustomButton from '../components/customButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Input from '../components/input';
import CardProduct from '../components/cardProducts';



const { width } = Dimensions.get('window');
//Arreglo de productos que cambiara
const products = [
    {
        id: '1',
        nombre: 'GOOD GIRL BLUSH',
        marca: 'Carolina Herrera',
        precio: '$99.95',
        imagen: require('../img/gucci.jpg'),
    },
    {
        id: '2',
        nombre: 'GOOD GIRL BLUSH',
        marca: 'Carolina Herrera',
        precio: '$99.95',
        imagen: require('../img/gucci.jpg'),
    },
    {
        id: '3',
        nombre: 'GOOD GIRL BLUSH',
        marca: 'Carolina Herrera',
        precio: '$99.95',
        imagen: require('../img/gucci.jpg'),
    },
];


const home = () => {
    //Variables para cambiar estado al boton
    const [search, setSearch] = useState('');
    const handlePantallas = () => {
        navigation.navigate('');
    };
    //Iterando sobre cada item del arreglo, agregando los datos para las cards
    const renderItem = ({ item }) => (
        <CardProduct
            nombre={item.nombre}
            marca={item.marca}
            precio={item.precio}
            imagen={item.imagen}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Essenzial</Text>
            <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Button with adjusted color pressed')}>
                <MaterialCommunityIcons name="cart" size={18} color="white" />
            </TouchableOpacity>
            <Input
                placeholder="Buscar"
                nombre={search}
                setNombre={setSearch}
            />
            <View style={styles.header}>
                <Text style={styles.title2}>Productos</Text>
                <TouchableOpacity onPress={handlePantallas}>
                    <Text style={styles.linkText}>Ver más</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        marginTop: 40,
        alignSelf: 'flex-start',
        marginLeft: 10,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    button: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#000000',
        borderRadius: 20,
        padding: 12,
        marginTop: 40,
    },
    title2: {
        marginTop: 10,
        alignSelf: 'flex-start',
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    containerText: {
        width: width - 40,
        alignItems: 'flex-end',

    },
    linkText: {
        alignSelf: 'flex-end',
        color: '#000000',
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    row: {
        justifyContent: 'space-between',
    },
    listContainer: {
        paddingBottom: 20,
    },
});

export default home;
