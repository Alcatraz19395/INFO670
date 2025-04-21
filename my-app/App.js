import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function App() {
  const [item, setItem] = useState('');
  const [groceryList, setGroceryList] = useState([]);

  const addItem = () => {
    if (!item.trim()) {
      Alert.alert("Invalid Input", "Please enter a non-empty item.");
      return;
    }
    setGroceryList([...groceryList, { key: Date.now().toString(), name: item }]);
    setItem('');
  };

  const deleteItem = (key) => {
    setGroceryList(groceryList.filter(item => item.key !== key));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Grocery List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add item..."
        value={item}
        onChangeText={setItem}
      />
      <Button title="Add Item" onPress={addItem} />
      <FlatList
        data={groceryList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => deleteItem(item.key)}>
            <Text style={styles.listItem}>• {item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  listItem: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});
