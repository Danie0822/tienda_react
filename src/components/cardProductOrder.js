// ProductCard.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProductCard = ({ image, name, brand, price, quantity }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.quantity}>Cantidad: {quantity}</Text>
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
});

export default ProductCard;
