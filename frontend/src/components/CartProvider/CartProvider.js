import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [orders, setOrders] = useState(JSON.parse(window.localStorage.getItem('orders')) || []);

    const handleAddOrder = (order) => {
        if (!orders) {
            setOrders([order]);
        } else {
            let index;
            for (let i = 0; i < orders.length; i++) {
                if ((orders[i]._id === order._id) && (orders[i].size === order.size)) {
                    index = i;
                    break;
                }
            }
            
            if (index === undefined) {
                setOrders([...orders, order]);
            } else {
                let isAdd = false;
                setOrders((orders) => {
                    if (!isAdd) {
                        orders[index].quantity += order.quantity;
                        isAdd = true;
                    }
                    
                    return [...orders];
                });
            }
        }
    }

    const handleRemoveOrder = (order) => {
        let index;
        for (let i = 0; i < orders.length; i++) {
            if ((orders[i]._id === order._id) && (orders[i].size === order.size)) {
                index = i;
                break;
            }
        }
        let isRemove = false;
        if (orders[index].quantity > 0) {
            setOrders((orders) => {
                if (!isRemove) {
                    orders[index].quantity -= order.quantity;
                    isRemove = true;
                }
                const newOrders = orders.filter((order) => (order.quantity > 0));
                return [...newOrders];
            });
        }
    }

    const handleDeleteOrder = (order) => {
        const newOrders = orders.filter((item) => (
            (item._id !== order._id) || (item.size !== order.size)
        ));
        setOrders([...newOrders]);
    }

    const handleDeleteAllOrder = () => {
        setOrders([]);
    }

    useEffect(() => {
        window.localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const value = {
        orders,
        handleAddOrder,
        handleRemoveOrder,
        handleDeleteOrder,
        handleDeleteAllOrder,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export { CartProvider, CartContext };