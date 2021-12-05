import React from 'react'
import { Router, Route } from 'react-router-dom'
import history from '../history';

import Header from './Header';

import SignUp from './farmer/SignUp';
import Login from './farmer/Login';
import AddProduct from './farmer/AddProduct';
import Dashboard from './farmer/Dashboard';
import DeleteProduct from './farmer/DeleteProduct';

import CustomerSignUp from './customer/SignUp';
import CustomerLogin from './customer/Login';

import Home from './Home';

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Header />
                <Route path='/' exact component={Home} />
                {/* Farmer Routes */}
                <Route path="/farmer/signup" exact component={SignUp} />
                <Route path="/farmer/login" exact component={Login} />
                <Route path="/farmer/dashboard" exact component={Dashboard} />
                <Route path="/farmer/addproduct" exact component={AddProduct} />
                <Route path="/farmer/deleteproduct/:id" exact component={DeleteProduct} />

                {/* Buyer Routes */}
                <Route path="/customer/signup" exact component={CustomerSignUp} />
                <Route path="/customer/login" exact component={CustomerLogin} />
            </Router>
        </div>
    )
}

export default App;