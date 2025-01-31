import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, TextInput, Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('679bacf500156821cb28'); // Your project ID

const databases = new Databases(client);
const databaseId = '679badc800335780c625';
const collectionId = '679bae2d002bf8f93ccc';

const CustomCheckBox = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity onPress={onValueChange} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, value && styles.checked]} />
    </TouchableOpacity>
  );
};

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await databases.listDocuments(databaseId, collectionId);
      setTodos(response.documents);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const response = await databases.createDocument(databaseId, collectionId, 'unique()', {
        title: newTodo,
        completed: false,
      });
      setTodos([...todos, response]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await databases.updateDocument(databaseId, collectionId, id, {
        completed: !completed,
      });
      setTodos(todos.map(todo => (todo.$id === id ? { ...todo, completed: !completed } : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await databases.deleteDocument(databaseId, collectionId, id);
      setTodos(todos.filter(todo => todo.$id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <Button title="Add" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <CustomCheckBox
              value={item.completed}
              onValueChange={() => toggleComplete(item.$id, item.completed)}
            />
            <Text style={item.completed ? styles.completedText : null}>{item.title}</Text>
            <Button title="Delete" onPress={() => deleteTodo(item.$id)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  checked: {
    backgroundColor: '#007BFF',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default TodoList;
