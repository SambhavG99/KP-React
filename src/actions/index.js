import farmerPortalAPI from "../api/farmer_portal";
import history from "../history";

export const farmerSignUp = (formValues) => async (dispatch) => {
  console.log("Farmer Sign Up Action Creator Triggered");
  let res = await farmerPortalAPI.post("/seller", formValues);
  const AUTH_TOKEN = res.headers['x-auth-token'];  
  dispatch({type: 'FARMER_SIGN_UP', payload: {...res.data, 'jwt': AUTH_TOKEN}});
};

export const farmerLogin = (formValues) => async (dispatch) => {
  console.log("Farmer Sign In Action Creator Triggered");
  const {data} = await farmerPortalAPI.post("/auth/seller", formValues);
  dispatch({type: 'FARMER_LOGIN', payload: data});
  history.push('/farmer/dashboard');
};

export const fetchProduct = (id) => async (dispatch,getState) => {
  const {auth} = getState();
  const options = {
    headers: {
      'x-auth-token': auth.user.jwt
    },
  };
  const {data} = await farmerPortalAPI.get(`/${id}`, {}, options);
  dispatch({type: 'FETCH_PRODUCT', payload: data});
}

export const fetchProducts = () => async (dispatch,getState) => {
  const {auth} = getState();
  const options = {
    headers: {
      'x-auth-token': auth.user.jwt
    },
  };
  const {data} = await farmerPortalAPI.get('/products/seller',options);
  dispatch({type: "FETCH_PRODUCTS", payload: data});
}

export const addProduct = (formValues) => async (dispatch, getState) => {
  const {auth} = getState();
  // dispatch({ type: "ADD_PRODUCT_LOAD_REQUEST", payload: {status: 'loading', message: "Adding your product..."} });
  const options = {
    headers: {
      "x-auth-token": auth.user.jwt,
      "content-type": "multipart/form-data",
    },
  };
  const {data} = await farmerPortalAPI.post("/products", formValues, options);
  dispatch({ type: "ADD_PRODUCT", payload: data });
  history.push('/farmer/dashboard');
};

export const deleteProduct = (id) => async (dispatch,getState) => {
  const {auth} = getState();
  const options = {
    headers: {
      "x-auth-token": auth.user.jwt
    },
  };
  console.log('Delete Action Triggered');
  await farmerPortalAPI.delete(`/products/${id}`, options);
  dispatch({type: 'DELETE_PRODUCT', payload: id});
  history.push('/farmer/dashboard');
}

export const buyerSignUp = (formValues) => {
  return {
    type: "BUYER_SIGN_UP",
    payload: formValues,
  };
};

export const buyerLogin = (formValues) => {
  return {
    type: "BUYER_LOGIN",
    payload: formValues,
  };
};
