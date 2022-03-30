import React, { useState } from 'react';

const OrderItemModifier = props=>{
    const [quantity, setQuantity] = useState(props.item.quantity);
    
    const handleNewValue = (e) => {
        setQuantity(e.target.value);
    }

    return <div className="order-item-modifier">
        <div className="modal">
           <h2>Modify this Item</h2>
           <h4>{props.item.name}</h4>
           <form>
               <label>
                   <input onChange={(event) => handleNewValue(event)} type='number' min='1' value={quantity}></input>
               </label>

               <button onClick={event => props.handleSubmitModification(event, quantity, props.item.id)}>Done</button>
           </form>
        </div>
    </div>;
}

export default OrderItemModifier;