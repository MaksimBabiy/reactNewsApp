const initialState = {
    city: 'Odessa'
};

export default function(state = initialState, action) {
    switch(action.type){
        case 'CHANGE_CITY':
            return {
                ...state,
                city: action.payload
            };
        default:
            return state
    }
}
