import React, {useState} from 'react';

import {
    ListView,
    ListViewHidden,
    HiddenButton,
    SwipedTodoText,
    TodoText,
    TodoDate,
    colors
} from "../styles/appStyles";

import {SwipeListView} from "react-native-swipe-list-view";
import{Entypo} from '@expo/vector-icons';

//Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListItems = ({todos, setTodos}) =>{

const [swipedRow, setSwipedRow] = useState(null);
const handleDeleteTodo = (rowMap, rowKey) =>{
    const newTodos = [...todos];
    const todoIndex = todos.findIndex((todo) => todo.key === rowKey);
    newTodos.splice(todoIndex, 1);

    AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos)).then(() => {
        setTodos(newTodos);
    }).catch(error => console.log(error));
}
return(
    <>
    {todos.length == 0 && <TodoText>Er zijn geen taken voor vandaag ingesteld.</TodoText>}
    {todos.length != 0 && 
 <SwipeListView 
 data={todos}
 renderItem={(data) => {
    const RowText = data.item.key == swipedRow ? SwipedTodoText : TodoText;
    return(
        <ListView
        uderlayColor={colors.primary}
        onpress={()=>{

        }}
        >
            <>
            <RowText>{data.item.title}</RowText>
            <TodoDate>{data.item.date}</TodoDate>
            </>
        </ListView>
    );
 }}
 renderHiddenItem={(data, rowMap)=>{
   return (
   <ListViewHidden>
        <HiddenButton
        onPress={() =>{handleDeleteTodo(rowMap, data.item.key)}}>
        <Entypo name="trash" size={25} color={colors.secondary} />
        </HiddenButton>
    </ListViewHidden>
   );
 }}

 // Sliding effect voor app te deleten (hidden trash can)
 leftOpenValue={80}
 previewRowKey={"1"}
 previewOpenValue={80}
 previewOpenDelay={3000}
 disableLeftSwipe={true}
 style={{
     flex:1, paddingBottom: 30,  marginBottom:40
 }}

 // Effect als 1 taak open is dan sluit de andere => 28:23
 onRowOpen={(rowKey) =>{
    setSwipedRow(rowKey);
 }}
 onRowClose={()=>{
     setSwipedRow(null);
 }}

 />}</>
);
}

export default ListItems;