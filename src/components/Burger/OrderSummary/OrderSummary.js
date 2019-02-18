import React from 'react'
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const ingredientSumary = Object.keys(props.ingredients).map((item) => {
        return (
            <li key={item}>{item.charAt(0).toUpperCase() + item.slice(1)}: {props.ingredients[item]}</li>
        )
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSumary}
            </ul>
            <p><strong>Total: {props.price.toFixed(2)}$</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.purchaseCancelled} btnType="Danger">CANCEL</Button>
            <Button clicked={props.purchaseContinued} btnType="Success">CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary