import React from 'react';

const Order = props => {

    let initialTotal = 0;
    let totalPrice = props.order.reduce(function (previousValue, currentValue) {
        return previousValue + (currentValue.price * currentValue.quantity)
    }, initialTotal);

    return <div className="order">
        <h2>Your Order</h2>
        <ul>
            {props.order.map((item,index) => (
                <li key={index}>
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                    <p>quantity: {item.quantity}</p>
                    <button onClick={(e) => props.handleRemoveFromOrder(e, item.id)}>Remove Item</button>
                    <button onClick={(e) => props.handleModifyOrderItem(e, item)}>Modify Item</button>
                </li>
            ))}
        </ul>
        <h3>Total: {totalPrice}</h3>
    </div>;
}

export default Order;