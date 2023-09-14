import { createSlice } from '@reduxjs/toolkit';



const initialStateNew = {
    orders: [
        {
            name: "Item-01", 
            width: 0.6, 
            depth: 2, 
            height: 0.4, 
            amount: 1, 
            weight: 1
        //     ->add?
            //color: "red"
            //priority: 0-100
            // Keep vertical
            //  Don't stack (keep on ground)
            //  Allow stacking (other things can be stacked on top)
        //      
        },
        {
            name: "Item-02", 
            width: 8, 
            depth: 1, 
            height: 1, 
            amount: 6, 
            weight: 1
        },
        {
            name: "Item-03", 
            width: 1.45, 
            depth: 2.65, 
            height: 0.55, 
            amount: 6, 
            weight: 1
        }
    ],
    totalAmountOfOrders: 0,
    totalWeight: 0,
}


const orderSlice = createSlice({
    name: "orders",
    initialState: initialStateNew,
    reducers: {
        addItem(state, action){
            const item = action.payload;
            const existingItem = state.orders.find(itemIndex => itemIndex.name === item.name);
            if(!existingItem)
            {
                state.orders.push({
                    name: item.name,
                    width: item.width,
                    depth: item.depth,
                    height: item.height,
                    amount: 1,
                    weight: item.weight
                })
            }else{
                existingItem.amount++;
                existingItem.totalWeight += item.weight;
            }
            state.totalAmountOfOrders++;
        },
        increaseItem(state, action){
            const name = action.payload;
            const existingItem = state.orders.find(itemIndex => itemIndex.name === name);
            if(!existingItem)
            {
                state.orders.push({
                    name: name.name,
                    width: name.width,
                    depth: name.depth,
                    height: name.height,
                    amount: 1,
                    weight: name.weight
                })
            }else{
                existingItem.amount++;
                existingItem.totalWeight += name.weight;
            }
            state.totalAmountOfOrders++;
        },

        removeSingleItem(state, action){
            const name = action.payload;
            const existingItem = state.orders.find(itemIndex => itemIndex.name === name);
            if(existingItem.amount === 0){
                existingItem.amount = 0;
            }else{
                existingItem.amount--;
                existingItem.totalWeight -= existingItem.weight;
                state.totalAmountOfOrders--;
            }
        },
        deleteItem(state, action){
            const name = action.payload;
            // const existingItem = state.packages.find(itemIndex => itemIndex.name === name);
            state.orders = state.orders.filter(item => item.name !== name)
        }
    }
});


export const orderActions = orderSlice.actions;
export default orderSlice.reducer;