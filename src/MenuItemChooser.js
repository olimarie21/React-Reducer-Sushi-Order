import React from 'react';
import { useState , useEffect } from 'react';
import axios from 'axios';

const MenuItemChooser = props => {
    
    // menu items
    const [items , setItems] = useState([]);

    // get menu items from the API once on component mount
    useEffect(function fetchItems(){
        axios.get('/api/v1/items')
        .then(results=>{
            setItems(results.data);
        })
        .catch(error=>console.log(error));
    },[]);

    return <div className="menu-item-chooser">
        <h2>Select Your Items</h2>
        <ul>
            {items.map(item=>
                <li key={item.id}>
                    <h3>{item.name}</h3>
                    <div>${item.price}</div>
                    <button onClick={event => props.handleAddToOrder(event, item)}>Add to Order</button>
                </li>)}
        </ul>
    </div>;
}

export default MenuItemChooser;