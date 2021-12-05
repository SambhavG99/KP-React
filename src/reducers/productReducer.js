import _ from 'lodash';

export let productReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_LOAD_REQUEST":
      return { ...state, loading_status: action.payload.status };
    case "ADD_PRODUCT_LOAD_RESPONSE":
      return { ...state, loading_status: action.payload.status };
    case "FETCH_PRODUCTS":
      return { ...state, ..._.mapKeys(action.payload, '_id')};
    case "FETCH_PRODUCT": 
      return {...state, [action.payload.id]: action.payload};
    case 'ADD_PRODUCT':
        return {...state, [action.payload._id]: action.payload};
    case 'DELETE_PRODUCT':
      return _.omit(state,action.payload);
    default:
      return state;
  }
};
