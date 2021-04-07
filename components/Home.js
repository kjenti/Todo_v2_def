import React, { useState } from "react";
//components
import Header from "./Header.js";
import ListItems from "./ListItems.js";
import InputModal from './InputModal.js';

//Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({todos, setTodos}) =>{

    //clear all todos
    const handeClearTodos = () =>{
        AsyncStorage.setItem("storedTodos", JSON.stringify([])).then(() => {
            setTodos([]);
        }).catch(error => console.log(error))
    }

    // Modal visibility  & input value
    const [modalVisible, setModalVisible] = useState(false);
    const [todoInputValue, setTodoInputValue] = useState();

    // function to add a new todo
    const handleAddTodo = (todo) =>{
        const newTodos = [...todos, todo];

        AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos)).then(() => {
            setTodos(newTodos);
            setModalVisible(false);
        }).catch(error => console.log(error));
    }

    return(
        <>
            <Header handeClearTodos={handeClearTodos} />
            <ListItems todos={todos} setTodos={setTodos} />
            <InputModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            todoInputValue={todoInputValue}
            setTodoInputValue={setTodoInputValue}
            handleAddTodo={handleAddTodo}
            todos={todos}
            />
        </>
    );
}

export default Home;