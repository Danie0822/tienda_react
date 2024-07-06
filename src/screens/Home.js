import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Input from '../components/input';
import CardProduct from '../components/cardProducts';
import useApi from '../controller/utilis/useApi';
import apiConfig from '../controller/utilis/apiConfig';

const baseURL = apiConfig.getBaseURL2(); // Asegúrate de que esto esté configurado correctamente

const { width } = Dimensions.get('window');

const Home = () => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const { fetchData } = useApi(); 
    const url = `/inventario/vistaPrueba/view/`;

    const fetchProducts = async () => {
        try {
            const response = await fetchData(url);
            if (response.success) {
                const formattedProducts = response.data.map(product => {
                    const imageUrl = `${baseURL}${product.ruta_imagen}`; 
                    return {
                        ...product,
                        ruta_imagen: imageUrl
                    };
                });
                setProducts(formattedProducts);
            } else {
                Alert.alert('Error al cargar:', 'Error al cargar los datos de los productos');
            }
        } catch (error) {
            Alert.alert('Error fetching products:', error.message);
        }
    };
    

    useEffect(() => {
        fetchProducts();
    }, []);

    const handlePantallas = () => {
        navigation.navigate('');
    };

    const renderItem = ({ item }) => (
        <CardProduct
            nombre={item.nombre_inventario}
            marca={item.nombre_marca}
            precio={item.precio_inventario}
            imagen={item.ruta_imagen}
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
                    keyExtractor={item => item.id_inventario.toString()}
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
