import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import CustomButton from '../components/customButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Input from '../components/input';

const { width } = Dimensions.get('window');

const Home = () => {

    const [search, setSearch] = useState('');

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
            <Text style={styles.title2}>Marcas favoritas</Text>
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
});

export default Home;
