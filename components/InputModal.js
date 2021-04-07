import React from 'react';
import {Modal} from 'react-native';
import {
    ModalButton,
    ModalContainer,
    ModalView,
    StyledInput,
    ModalAction,
    ModalActionGroup,
    ModalIcon,
    HeaderTitle,
    colors
} from './../styles/appStyles';
import {AntDesign} from '@expo/vector-icons';

const InputModal = ({modalVisible, setModalVisible, todoInputValue, setTodoInputValue, handleAddTodo, todos}) =>{

    const handleCloseModal = () =>{
        setModalVisible(false);
        setTodoInputValue("");
    }

    const handleSubmit = () =>{
        handleAddTodo({
            title: todoInputValue,
            date: new Date().toUTCString(),
            key: `${(todos[todos.length-1] && parseInt(todos[todos.length -1].key) + 1) || 1}`
        });
        setTodoInputValue("");
        alert("Uw taak is succesvol toegevoegd")
    }

    return(
        <>
        <ModalButton onPress={ () => {setModalVisible(true)}}>
            <AntDesign name="plus" size={30} color={colors.secondary}></AntDesign>
        </ModalButton>

        <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
        >
            <ModalContainer>
                <ModalView>
                <ModalIcon>
                    <HeaderTitle>Taak toevoegen</HeaderTitle>
                <AntDesign name="edit" size={30} color={colors.tertiary}></AntDesign> 
                </ModalIcon>
                <StyledInput placeholder = "Voeg een taak toe"
                placeholderTextColor={colors.alternative}
                selectionColor={colors.secondary}
                autoFocus={true}
                onChangeText={(text) => setTodoInputValue(text)}
                value={todoInputValue}
                onSubmitEditing={handleSubmit}
                />

            <ModalActionGroup>
                <ModalAction color={colors.primary} onPress={handleCloseModal}>
                <AntDesign name="close" size={28} color={colors.tertiary}></AntDesign> 
                </ModalAction>
                <ModalAction color={colors.tertiary} onPress={handleSubmit}>
                <AntDesign name="check" size={28} color={colors.secondary}></AntDesign> 
                </ModalAction>
            </ModalActionGroup>
            </ModalView>
            </ModalContainer>

        </Modal>

        </>
    );
}
export default InputModal;