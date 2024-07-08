// CardOrder.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CardOrder = ({ orderNumber, orderDate, onPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.orderNumber}>Pedido número #{orderNumber}</Text>
      <Text style={styles.orderDate}>Fecha del pedido: {orderDate}</Text>
      <Text style={styles.paymentMethod}>Método de pago: Contra-entrega</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Ver detalles</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  orderNumber: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderDate: {
    marginBottom: 5,
  },
  paymentMethod: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default CardOrder;
