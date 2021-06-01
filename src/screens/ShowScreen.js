import React, { useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux";

//actions 
import { fetchData, deleteData } from '../actions/index';

const ShowScreen = ({ getData, fetchData, navigation, deleteData }) => {

    useEffect(() => {
        fetchData();



    }, [])

    const deleteHandler = (id) => {
        deleteData(id);

    };

    navigation.addListener('focus', () => {
        fetchData();
    });

    return (
        <View style={style.screen}>
            <View style={style.container}>


                <FlatList
                    data={getData}
                    keyExtractor={(moment) => moment.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={style.row}>

                                <View >
                                    <Image style={style.image} source={{ uri: item.imageUri }}></Image>
                                </View>
                                <TouchableOpacity
                                    style={style.textContainer}
                                    onPress={() => navigation.navigate('Detail', { idCatched: item.id })}>
                                    <Text
                                        style={style.title}
                                        numberOfLines={1}
                                    >{item.title}</Text>
                                    <Text
                                        numberOfLines={1}
                                    >{item.description}</Text>
                                    <View style={style.borderBar}></View>
                                </TouchableOpacity>
                                <View style={{ justifyContent: "center" }}>
                                    <TouchableOpacity onPress={() => deleteHandler(item.id)}>
                                        <Ionicons name="ios-trash-bin-outline" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    }}
                >
                </FlatList>


            </View>
        </View >
    );


};

const style = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
    },
    container: {
        marginTop: 30,
        flex: 1,
        width: "90%"
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    textContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        maxWidth: "80%",
    },

    borderBar: {

        borderBottomWidth: 1,
        borderColor: '#ccc',

    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    title: {
        fontWeight: "bold"
    }


});

const mapStateToProp = (state) => {
    return { getData: state.moments }
}

export default connect(mapStateToProp, { fetchData, deleteData })(ShowScreen);