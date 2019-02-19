import React, {Component} from 'react';

import classes from './Modal.css';
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";


class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('[Modal] Will Update')
    }

    render() {
        return <Aux>
            <Backdrop
                show={this.props.show}
                clicked={this.props.modalClosed}/>
            <div className={classes.Modal} style={{
                transform: this.props.show ? 'transformY(0)' : 'transformY(-100vh)',
                opacity: this.props.show ? '1' : '0',
                visibility: this.props.show ? 'visible' : 'hidden'
            }}>
                {this.props.children}
            </div>
        </Aux>
    }
}

export default Modal;