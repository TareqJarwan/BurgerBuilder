import React, {Component} from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {checkErrors, checkValidity, updateObject} from "../../shared/utility";

import classes from './Auth.css';
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);

    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        this.setState({
            controls: updatedControls
        });
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath) {
            this.props.onSetAuthRedirectPath('/');
        }
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                <h3>{this.state.isSignUp ? 'SignUp' : 'SignIn'} Page</h3>
                {formElementArray.map(element => (
                    <Input key={element.id}
                           elementType={element.config.elementType}
                           elementConfig={element.config.elementConfig}
                           value={element.config.value}
                           invalid={!element.config.valid}
                           shouldValidate={element.config.validation}
                           touched={element.config.touched}
                           changed={(event) => this.inputChangedHandler(event, element.id)}/>
                ))}
                <Button btnType="Success">SUBMIT</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner/>;
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <div className={classes.Alert}>
                    <strong>Danger!</strong> {checkErrors(this.props.error)}
                </div>
            )
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SINGUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        buildingBurger: state.burgerBuilder.building,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
