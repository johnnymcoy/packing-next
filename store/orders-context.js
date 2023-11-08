import { createSlice } from '@reduxjs/toolkit';


const initialStateNew = {
    orders: [
        {
            id: "order_01",
            name: "order_01", 
            items: [{
                id: "235981x",
                name: "Item-03", 
                width: 1.45, 
                depth: 2.65, 
                height: 0.55, 
                weight: 1,
                amount: 10,
                get volume() {
                    return this.width * this.depth * this.height;
                }
            },
            {
                id: "23461x",
                name: "Item-08", 
                width: 1.45, 
                depth: 2.65, 
                height: 0.55, 
                weight: 1,
                amount: 2,
                get volume() {
                    return this.width * this.depth * this.height;
                }
            },
            {
                id: "23598dx",
                name: "Item-02", 
                width: 8, 
                depth: 1, 
                height: 1, 
                weight: 1,
                amount: 2,
                get volume() {
                    return this.width * this.depth * this.height;
                }
            },],
            get weight() {
                let total = 0;
                for(let i = 0; i < this.items.length; i++)
                {
                    total += this.items[i].weight;
                }
                return total;
            },      
            get volume() {
                let total = 0;
                for(let i = 0; i < this.items.length; i++)
                {
                    total += this.items[i].volume;
                }
                return total;
            },
            //->add?
            //color: "red"
            //priority: 0-100
            // Keep vertical
            //  Don't stack (keep on ground)
            //  Allow stacking (other things can be stacked on top)
        },
        {
            id: "order_02",
            name: "order_02", 
            items: [{
                id: "235981x",
                name: "Item-03", 
                width: 1.45, 
                depth: 2.65, 
                height: 0.55, 
                weight: 1,
                amount: 1,
                get volume() {
                    return this.width * this.depth * this.height;
                }
            },
            {
                id: "23598dx",
                name: "Item-02", 
                width: 8, 
                depth: 1, 
                height: 1, 
                weight: 1,
                amount: 2,
                get volume() {
                    return this.width * this.depth * this.height;
                }
            },],
            get weight() {
                let total = 0;
                for(let i = 0; i < this.items.length; i++)
                {
                    total += this.items[i].weight;
                }
                return total;
            },      
            get volume() {
                let total = 0;
                for(let i = 0; i < this.items.length; i++)
                {
                    total += this.items[i].volume;
                }
                return total;
            },
        //     ->add?
            //color: "red"
            //priority: 0-100
            // Keep vertical
            //  Don't stack (keep on ground)
            //  Allow stacking (other things can be stacked on top)
        //      
        },
        {
            id: "order_03",
            name: "order_03", 
            items: [{
                id: "235981x",
                name: "Item-03", 
                width: 1.45, 
                depth: 2.65, 
                height: 0.55, 
                weight: 1,
                amount: 2,
                get volume() {
                    return this.width * this.depth * this.height;
                }
            },
            {
                id: "23598dx",
                name: "Item-02", 
                width: 8, 
                depth: 1, 
                height: 1, 
                weight: 1,
                amount: 2,
                get volume() {
                    return this.width * this.depth * this.height;
                }
            },],
            get weight() {
                let total = 0;
                for(let i = 0; i < this.items.length; i++)
                {
                    total += this.items[i].weight;
                }
                return total;
            },      
            get volume() {
                let total = 0;
                for(let i = 0; i < this.items.length; i++)
                {
                    total += this.items[i].volume;
                }
                return total;
            },
        //     ->add?
            //color: "red"
            //priority: 0-100
            // Keep vertical
            //  Don't stack (keep on ground)
            //  Allow stacking (other things can be stacked on top)
        //      
        },
    ],
    totalAmountOfOrders: 0,
    totalWeight: 0,
}


const orderSlice = createSlice({
    name: "orders",
    initialState: initialStateNew,
    reducers: {
        createOrder(state, action){
            const order = action.payload;
            state.orders.push({
                id: order.id,
                name: order.name,
                items: order.items.map(item => ({ ...item, amount: 1 })),
                get weight() {
                    let total = 0;
                    for(let i = 0; i < this.items.length; i++)
                    {
                        total += this.items[i].weight;
                    }
                    return total;
                },      
                get volume() {
                    let total = 0;
                    for(let i = 0; i < this.items.length; i++)
                    {
                        total += this.items[i].volume;
                    }
                    return total;
                }})                    
        },
        increaseItem(state, action){
            const {item: itemID, order: orderID} = action.payload;
            const order = state.orders.find(orderIndex => orderIndex.id === orderID);
            if(order)
            {
                const item = order.items.find(itemIndex => itemIndex.id === itemID);
                if(item)
                {
                    item.amount++;
                }
            }
        },
        decreaseItem(state, action){
            const {item: itemID, order: orderID} = action.payload;
            const orderIndex = state.orders.findIndex(order => order.id === orderID);
            if (orderIndex !== -1) {
                const order = state.orders[orderIndex];
        
                // Find the index of the item
                const itemIndex = order.items.findIndex(item => item.id === itemID);
        
                if (itemIndex !== -1) {
                    const item = order.items[itemIndex];
        
                    if (item.amount <= 1) {
                        // Create a new items array without the item
                        const newItems = order.items.filter(item => item.id !== itemID);
        
                        // Create a new orders array with the updated order
                        state.orders = [
                            ...state.orders.slice(0, orderIndex),
                            { ...order, items: newItems },
                            ...state.orders.slice(orderIndex + 1)
                        ];
                    } else {
                        // Decrease the amount of the item
                        item.amount--;
                    }
                }
            } 
        },

        removeSingleItem(state, action){
            const {item: itemID, order: orderID} = action.payload;
            console.log(itemID, orderID)
            const orderIndex = state.orders.findIndex(order => order.id === orderID);
            if (orderIndex !== -1) {
                const order = state.orders[orderIndex];
                // Find the index of the item
                const itemIndex = order.items.findIndex(item => item.id === itemID);
        
                if (itemIndex !== -1) {
                    // Create a new items array without the item
                    const newItems = order.items.filter(item => item.id !== itemID);
                    if(newItems.length === 0)
                    {
                        state.orders = state.orders.filter(item => item.id !== orderID)
                        return;
                    }
                    // Create a new orders array with the updated order
                    state.orders = [
                        ...state.orders.slice(0, orderIndex),
                        { ...order, items: newItems },
                        ...state.orders.slice(orderIndex + 1)
                    ];
                }
                
            } 
        },
        deleteOrder(state, action){
            const id = action.payload;
            console.log(id)
            state.orders = state.orders.filter(item => item.id !== id)
        },
        clearAllOrders(state, action){
            state.orders = [];
        }
    }
});


export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
