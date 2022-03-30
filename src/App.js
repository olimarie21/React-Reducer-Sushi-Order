import React, { useReducer, useState } from 'react';
import MenuItemChooser from './MenuItemChooser.js';
import Order from './Order.js';
import OrderItemModifier from './OrderItemModifier.js';

const orderReducer = (order, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            if(order.find(item => item.id === action.id)) {
                const found = order.find(item => item.id === action.id);
                if(found.id === action.id) {
                    found.quantity ++;
                    return [...order];
                }
            }
            return [
                ...order, 
                    {   
                        id: action.id,
                        name: action.name,
                        price: action.price,
                        quantity: 1
                    }
                ]
        case 'REMOVE_ITEM': 
            return order.filter(item => item.id !== action.id);
        case 'MODIFY_ITEM': 

        console.log(action)
            order.map(item => {
                if(item.id === action.id) {
                    item.quantity = action.quantity;
                }
            })
            return [...order];
    }
}


const App = props=>{

    const [initialOrder, setInitialOrder] = useState([]);
    const [order, dispatch] = useReducer(orderReducer, initialOrder);
    const [showModal, setModal] = useState(false);
    const [item, setItem] = useState("");
    
    const handleAddToOrder = (event,item) =>{
        event.preventDefault();
        dispatch({ type: 'ADD_ITEM', id: item.id, name: item.name, price: item.price});
    }

    const handleRemoveFromOrder = (event, orderItemId)=>{
        event.preventDefault();
        dispatch({ type: 'REMOVE_ITEM', id: orderItemId});
    }

    const handleModifyOrderItem = (event, orderItemId)=>{
        event.preventDefault();
        setModal(true);
        setItem(orderItemId);
    }
    
    const handleSubmitModification = (event, newQuantity, itemId)=>{
        event.preventDefault();
        dispatch({type: 'MODIFY_ITEM', quantity: newQuantity, id: itemId});
        setModal(false);
    }

    return <div className="app">
        <h1>Sushi Delivery</h1>
        <MenuItemChooser handleAddToOrder={handleAddToOrder}/>

        <Order order={order} handleRemoveFromOrder={handleRemoveFromOrder} handleModifyOrderItem={handleModifyOrderItem}/>

        {showModal ? 
            <OrderItemModifier item={item} handleSubmitModification={handleSubmitModification} /> 
            : null  
        }
    </div>;
}

export default App;