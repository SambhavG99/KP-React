export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FARMER_SIGN_UP':
        case 'FARMER_LOGIN': {
            localStorage.setItem('jwt', action.payload.jwt);
            return {...state, user: action.payload}
        }       
        default: return state;
    }
};