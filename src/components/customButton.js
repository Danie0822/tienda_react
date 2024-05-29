import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

// Obtener el ancho de la pantalla
const { width } = Dimensions.get('window');

const CustomButton = ({ text, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: width - 40,
        height: 50,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CustomButton;
