// ProductCard.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const ProductCard = ({ image, name, brand, price, quantity }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.quantity}>Cantidad: {quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ValoracionesScreen')}>
        <MaterialIcons name="star" size={16} color="#fff" />
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
  },
  brand: {
    color: '#666',
  },
  price: {
    color: '#000',
    fontWeight: 'bold',
  },
  quantity: {
    color: '#000',
    marginLeft: 180,
    fontWeight: '600'
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    marginTop: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 35
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ProductCard;
