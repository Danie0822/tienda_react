import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';

// Obtener el ancho de la pantalla
const { width } = Dimensions.get('window');

const CustomTextInput = ({ placeholder, secureTextEntry, keyboardType, nombre, setNombre }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#888"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      value={nombre}
      onChangeText={setNombre}
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

export default CustomTextInput;
