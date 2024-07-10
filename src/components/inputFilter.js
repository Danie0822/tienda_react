// Input.js
import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';

// Obtener el ancho de la pantalla
const { width } = Dimensions.get('window');

//Creacion del input con filtros
const InputFilter = ({ placeholder, value, onChangeText }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: width - 40,
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#f5f5f5',
        borderWidth: 0,
      },
});

export default InputFilter;
