import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Image, Alert } from 'react-native';


import * as ImagePicker from "expo-image-picker";




const MomentForm = ({ onSubmit, navigation, initialValues }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState(initialValues.description);

    const resetInputHandler = () => {
        setTitle('');
        setImage('');
        setDescription('');
    };
    const confirmHandler = () => {
        if (title.length < 5) {
            Alert.alert(
                'Invalid Input',
                'Your Title need at least 5 characters',
                [{ text: 'Okay', style: 'destructive' }]
            )
        }
        else if (!image && !initialValues.edit) {
            Alert.alert(
                'No Image Selected',
                'Please capture your moment first',
                [{ text: 'Okay', style: 'destructive' }]
            )
        }
        else if (description.length < 10) {
            Alert.alert(
                'Invalid Input',
                'Your moment story need at least 10 characters',
                [{ text: 'Okay', style: 'destructive' }]
            )
        }
        else if (initialValues.edit) {

            onSubmit(title, description);
            resetInputHandler();
        }
        else {
            onSubmit(title, image, description);
            resetInputHandler();
        }

    };

    const resetHandler = () => {
        setImage(null);
    }

    //IOShandler
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })
            ()
        navigation.addListener('focus', () => {
            resetHandler();
        });


    }, []);

    const takeImageHandler = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    //title button

    let buttonTitle = "Save moment";
    { initialValues.edit ? buttonTitle = "Edit moment" : null }






    return (
        <View >
            <View style={style.row}>
                <Text style={{ fontSize: 20 }}>Title : </Text>

                <TextInput
                    style={style.textInput}
                    placeholder="Enter Title"
                    value={title}
                    onChangeText={text => setTitle(text)}
                ></TextInput>
            </View>
            {initialValues.edit ? null :
                <View style={style.imagePreview}>
                    {image ? <Image style={style.image} source={{ uri: image }}></Image> : <View style={{ alignItems: "center" }}><Text>No image selected</Text></View>}


                </View>
            }
            <View>
                <TextInput
                    style={style.textInput2}
                    placeholder="Write your moment here"
                    multiline={true}
                    numberOfLines={3}
                    maxLength={100}
                    value={description}
                    onChangeText={text => setDescription(text)}
                >
                </TextInput>
            </View>
            <View style={style.rowButton}>
                <View>
                    {initialValues.edit ? null :
                        <Button
                            title="Take Image"
                            onPress={takeImageHandler}
                        >
                        </Button>
                    }
                </View>
                <View>
                    <Button title={buttonTitle} onPress={confirmHandler}></Button>
                </View>
            </View>

        </View>
    );
};
const style = StyleSheet.create({

    container: {
        marginTop: 30,
        flex: 1,
        width: "80%",
        borderWidth: 5,
        borderColor: "black",
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    rowButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15
    },
    textInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    textInput2: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    imagePreview: {
        marginTop: 15,
        height: 200,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    image: {
        width: "100%",
        height: "100%",

    },
    button: {
        marginTop: 15,
    }

});

export default MomentForm;