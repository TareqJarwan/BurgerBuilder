import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgurBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";

import * as actions from "./store/actions";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});

const asyncOrder = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" exact component={asyncAuth}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout}/>
                    <Route path="/orders" exact component={asyncOrder}/>
                    <Route path="/logout" exact component={Logout}/>
                    <Route path="/auth" exact component={asyncAuth}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                </Switch>
            );
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
