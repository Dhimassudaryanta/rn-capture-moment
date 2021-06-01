import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.dbnew');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                // 'DROP TABLE places',
                'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, description TEXT NOT NULL, date TEXT NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const insertPlace = (title, imageUri, description, date) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO places (title, imageUri, description,date) VALUES (?, ?,? ,?);`,
                [title, imageUri, description, date],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM places',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const deletePlaces = newId => {
    console.log(newId);
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(

                `DELETE FROM places WHERE id=${newId}`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const updatePlaces = (id, title, description) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE places SET title=?, description=? where id=${id};`,
                [title, description],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};