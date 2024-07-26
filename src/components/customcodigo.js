import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
// Componente para ingresar un código
const CustomCodigoInput = ({ placeholder, nombre, setNombre }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#888"
      value={nombre}
      onChangeText={(text) => {
        if (text.length <= 1) {
          setNombre(text.toUpperCase()); 
        }
      }}
      maxLength={1} 
      keyboardType="default" 
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: width / 7, 
    height: 60,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 15, 
    paddingHorizontal: 15,
    marginBottom: 15,
    marginLeft: 10,
    fontSize: 24,
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
});

export default CustomCodigoInput;
