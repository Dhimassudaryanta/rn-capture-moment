import React from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import { State } from 'react-native-gesture-handler';
//redux

import { connect } from 'react-redux';
import colors from '../colors';

const DetailScreen = ({ route, getData, navigation }) => {

    const { idCatched } = route.params;

    const Detail = getData.find(
        (Detail) => Detail.id === idCatched
    );




    return (
        <View style={style.screen}>
            <View style={style.imageContainer}>
                <Image style={style.image} source={{ uri: Detail.imageUri }}></Image>
            </View>

            <View style={style.container}>
                <View style={style.border}></View>
                <View style={style.content}>
                    <Text>Title : {Detail.title}</Text>
                    <Text

                    >Description : {Detail.description}</Text>
                    <Text>Date taken : {Detail.date}</Text>
                </View>
                <View style={style.buttonScreen}>
                    <View style={style.buttonContainer}>
                    </View>
                </View>
            </View>
        </View >
    );

};



const style = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center"
    },
    container: {
        width: "90%",
        flex: 1
    },
    imageContainer: {
        width: "100%",
        maxHeight: 250,
    },
    image: {
        width: "100%",
        height: "100%"
    },
    content: {
        marginTop: 20,
        fontSize: 16,
        borderWidth: 2,
        borderColor: "#ccc",
        padding: 20,
    },
    border: {
        marginTop: 30,
        borderBottomWidth: 2,
        borderColor: "#ccc"
    },
    buttonScreen: {
        paddingTop: 15,
        maxWidth: "100%",
        alignItems: "center",


    },
    buttonContainer: {
        maxWidth: "50%",
    }

});



const mapStateToProp = state => {
    return { getData: state.moments }
};

export default connect(mapStateToProp)(DetailScreen);