import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, FlatList, Modal, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState<string[]>(['hello world']);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateInput, setUpdateInput] = useState('');
  const [index, setIndex] = useState(0);

  const addTodo = () => {
    if (input.trim()) {
      setTodo([...todo, input]);
      setInput('');
    }
  };

  const deleteTodo = (index: number) => {
    todo.splice(index, 1);
    setTodo([...todo]);
  };

  const editTodo = (index: number) => {
    todo.splice(index, 1, updateInput);
    setTodo([...todo]);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <Image source={require('../app/logo.png')} style={styles.lgog}/>
      
      <Text style={styles.heading}>Todo App</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={input}
        placeholder='Enter Your Todo Here'
      />
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text>Add Todo</Text>
      </TouchableOpacity>

      {todo.length > 0 ? (
        <FlatList
          style={styles.list}
          data={todo}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => deleteTodo(index)} style={styles.iconButton}>
                  <Ionicons name="trash-outline" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIndex(index);
                    setUpdateInput(item);
                    setModalVisible(true);
                  }}
                  style={styles.iconButton}
                >
                  <Ionicons name="pencil-outline" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noTodoText}>No Todo Found...</Text>
      )}

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Update Todo!</Text>
              <TextInput
                style={styles.updateInput}
                onChangeText={setUpdateInput}
                value={updateInput}
              />
              <View style={styles.modalButtonContainer}>
                <Pressable
                  style={[styles.modalBtn, styles.buttonClose]}
                  onPress={() => editTodo(index)}
                >
                  <Text style={styles.textStyle}>Update Todo</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalBtn, styles.buttonCancel]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  lgog:{
    width: 200,
    height: 200,
    alignSelf:'center',
    marginTop:50
  },
  heading:{
    alignSelf:'center',
    fontSize:20
  },
  input: {
    height: 48,
    marginHorizontal: 40,
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 30,
  },
  list: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: 'white',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
    padding: 10,
  },
  noTodoText: {
    color: 'black',
    margin: 20,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalBtn: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '50%',
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: 'blue',
  },
  buttonCancel: {
    backgroundColor: 'blue', 
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  updateInput: {
    margin: 20,
    width: 300,
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
  },
});


export default Home;
