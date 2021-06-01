export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_DATA':
            return action.payload;
        case 'ADD_DATA':
            return [...state, action.payload];
        case 'DELETE_DATA':
            return state.filter(data => data.id !== action.payload);
        default:
            return state;
    }
};
