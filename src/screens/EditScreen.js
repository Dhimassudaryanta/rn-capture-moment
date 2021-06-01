import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import MomentForm from '../components/MomentForm';

//redux
import { connect } from 'react-redux';
import { updateData } from '../actions/index';

const EditScreen = ({ route, navigation, getData, updateData }) => {
    const { id } = route.params;

    const onPressHandler = (title, description) => {
        updateData(id, title, description, () => navigation.navigate('Show',));
    };


    const Detail = getData.find(
        (Detail) => Detail.id === id
    );

    console.log(Detail);

    return (
        <View style={style.screen}>
            <View style={style.container}>
                <MomentForm
                    initialValues={{
                        title: Detail.title,
                        description: Detail.description,
                        edit: "edit"
                    }}
                    navigation={navigation}
                    onSubmit={onPressHandler}
                >
                </MomentForm>
            </View>

        </View>
    );
};

const style = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center"
    },
    container: {
        marginTop: 30,
        flex: 1,
        width: "80%",
    }
})

const mapStateToProps = state => {
    return {
        getData: state.moments
    };
};

export default connect(mapStateToProps, { updateData })(EditScreen);