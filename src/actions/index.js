import * as FileSystem from "expo-file-system";

import { insertPlace, fetchPlaces, deletePlaces, updatePlaces } from "../db/index";

// export const addData = (title, id, image, callback) => async dispatch => {
//     console.log(image);

//     dispatch({ type: 'ADD_DATA', payload: { id: id, title: title, uri: image } });

//     if (callback) {
//         callback();
//     }
// };

export const addData = (title, image, description, date, callback) => async dispatch => {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
        await FileSystem.moveAsync({
            from: image,
            to: newPath
        });
        const dbResult = await insertPlace(title, newPath, description, date);
        console.log(dbResult);
        dispatch({ type: 'ADD_DATA', payload: { id: dbResult.insertId, title: title, imageUri: newPath, description, date } });


    } catch (err) {
        console.log(err);
        throw err;
    }
    console.log(image);

    if (callback) {
        callback();
    }
};

export const fetchData = () => async dispatch => {

    const dbResult = await fetchPlaces();
    console.log(dbResult);
    dispatch({ type: "FETCH_DATA", payload: dbResult.rows._array })

};

export const deleteData = id => async dispatch => {
    const newId = id;
    const dbResult = await deletePlaces(newId);
    dispatch({ type: "DELETE_DATA", payload: newId })

};

export const updateData = (id, title, description, callback) => async dispatch => {


    const dbResult = await updatePlaces(id, title, description);
    console.log(dbResult);


    if (callback) {
        callback();
    }
};