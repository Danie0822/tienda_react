import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputFilter from '../components/inputFilter';
import { useNavigation } from '@react-navigation/native';
import CardProduct from '../components/cardProducts';
import { fetchProducts } from '../controller/publica/listaProductos';
import useApi from '../controller/utilis/useApi';

const { width } = Dimensions.get('window');

const Home = () => {
    const { fetchData } = useApi(); //Llamamos los metodos de la api para llamar al servidor
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [nombreCliente, setNombreCliente] = useState('');
    const navigation = useNavigation();
    
    //Inicializamos los productos cuando carga la pantalla
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const fetchedProducts = await fetchProducts(fetchData);
                setProducts(fetchedProducts);
            } catch (error) {
                Alert.alert('Error al cargar', error.message);
            }
        };

        const loadNombreCliente = async () => {
            try {
                const nombre = await AsyncStorage.getItem('nombre_cliente');
                if (nombre) {
                    setNombreCliente(nombre);
                }
            } catch (error) {
                console.error('Error al cargar el nombre del cliente:', error);
            }
        };

        loadProducts();
        loadNombreCliente();
    }, []);

    const handlePress = () => {
        navigation.navigate('Carrito');
    };
    

    //Filtramos los productos por el nombre obtenido del array
    const filteredProducts = search ? products.filter(product =>
        product.nombre_inventario.toLowerCase().includes(search.toLowerCase())
    ) : products;

    //Renderizamos la card
    const renderItem = ({ item }) => (
        <CardProduct
            id_inventario={item.id_inventario}
            nombre={item.nombre_inventario}
            marca={item.nombre_marca}
            precio={item.precio_inventario}
            imagen={item.ruta_imagen}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Essenzial</Text>
            <Text style={styles.name}>Bienvenido {nombreCliente}</Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <MaterialCommunityIcons name="cart" size={18} color="white" />
            </TouchableOpacity>
            <InputFilter
                placeholder="Buscar productos"
                value={search}
                onChangeText={setSearch}
            />
            <View style={styles.header}>
                <Text style={styles.title2}>Productos</Text>
            </View>
            <FlatList
                data={filteredProducts}
                renderItem={renderItem}
                keyExtractor={item => item.id_inventario.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContainer}
            />
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
        marginBottom: 10,
        color: '#000',
    },
    name: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        fontSize: 16,
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
        color: '#4B77BE',
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: 100,
    },
    row: {
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default Home;
