import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';
import MomentForm from '../components/MomentForm';


import { connect } from 'react-redux';
import { addData } from '../actions/index';

const AddScreen = ({ addData, navigation }) => {

    const onPressHandler = (title, image, description) => {
        addData(title, image, description, new Date().toString(), () => navigation.navigate('Show',));
    };

    return (
        <View style={style.screen}>
            <View style={style.container}>
                <MomentForm
                    initialValues={{
                        title: '',
                        description: '',
                    }
                    }
                    onSubmit={onPressHandler}
                    navigation={navigation}

                >
                </MomentForm>

            </View>
        </View>
    );


};

const style = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white"
    },
    container: {
        marginTop: 30,
        flex: 1,
        width: "80%",
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    textInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    }

});

export default connect(null, { addData })(AddScreen);