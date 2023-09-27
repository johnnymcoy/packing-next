import { createSlice } from '@reduxjs/toolkit';


const initialStateNew = {
    orders: [
        // {
        //     name: "Cushion w Poly",
        //     width: 30, 
        //     depth: 64, 
        //     height: 10, 
        //     amount: 1, 
        //     weight: 0.1
        // },
        // {
        //     name: "Cushion w duck",
        //     width: 40, 
        //     depth: 40, 
        //     height: 10, 
        //     amount: 2, 
        //     weight: 0.1
        // },
        // {
        //     name: "Doormat",
        //     width: 60, 
        //     depth: 90, 
        //     height: 1.5, 
        //     amount: 2, 
        //     weight: 0.1
        // },
        // {
        //     name: "TeaTowel",
        //     width: 15, 
        //     depth: 18, 
        //     height: 3, 
        //     amount: 2, 
        //     weight: 0.1
        // },

        // {
        //     name: "Cushion w Poly",
        //     width: 30, 
        //     depth: 64, 
        //     height: 10, 
        //     amount: 1, 
        //     weight: 0.1
        // },
        // {
        //     name: "Cushion w Poly2",
        //     width: 40, 
        //     depth: 40, 
        //     height: 10, 
        //     amount: 1, 
        //     weight: 0.1
        // },
        // {
        //     name: "Cushion w Poly3",
        //     width: 50, 
        //     depth: 30, 
        //     height: 10, 
        //     amount: 1, 
        //     weight: 0.1
        // },
        // {
        //     name: "Lamp",
        //     width: 45, 
        //     depth: 45, 
        //     height: 63, 
        //     amount: 1, 
        //     weight: 0.1
        // },


        // {
        //     name: "Throw",
        //     width: 32, 
        //     depth: 23, 
        //     height: 7, 
        //     amount: 1, 
        //     weight: 0.1
        // },
        // {
        //     name: "Coverlet set",
        //     width: 40, 
        //     depth: 50, 
        //     height: 15, 
        //     amount: 1, 
        //     weight: 0.1
        // },
        // {
        //     name: "Throw",
        //     width: 32, 
        //     depth: 23, 
        //     height: 7, 
        //     amount: 1, 
        //     weight: 0.1
        // },
        // {
        //     name: "lamp",
        //     width: 42, 
        //     depth: 42, 
        //     height: 68, 
        //     amount: 2, 
        //     weight: 0.1
        // },

        // {
        //     name: "Candle Stand",
        //     width: 10, 
        //     depth: 10, 
        //     height: 23, 
        //     amount: 1, 
        //     weight: 0.1
        // },
        // {
        //     name: "Candle Stand2",
        //     width: 11, 
        //     depth: 11, 
        //     height: 30, 
        //     amount: 1, 
        //     weight: 0.1
        // }

        // {
        //     name: "Cushion Cover",
        //     width: 25, 
        //     depth: 10, 
        //     height: 1, 
        //     amount: 2, 
        //     weight: 0.1
        // }

        // {
        //     name: "Cushion w poly",
        //     width: 30, 
        //     depth: 64, 
        //     height: 10, 
        //     amount: 1, 
        //     weight: 0.1
        // }

        // {
        //     name: "Doormat",
        //     width: 60, 
        //     depth: 90, 
        //     height: 1.5, 
        //     amount: 1, 
        //     weight: 0.1
        // }

        // {
        //     name: "Cushion w Duck",
        //     width: 40, 
        //     depth: 40, 
        //     height: 10, 
        //     amount: 3, 
        //     weight: 0.1
        // }

        // {
        //     name: "Rectangular Platter",
        //     width: 46, 
        //     depth: 36, 
        //     height: 31, 
        //     amount: 1, 
        //     weight: 0.1
        // }
        {
            id: "ord1240sx",
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
            id: "23598dx",
            name: "Item-02", 
            width: 8, 
            depth: 1, 
            height: 1, 
            amount: 6, 
            weight: 1
        },
        {
            id: "23598dx",
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
                    id: item.id,
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
                    id: item.id,
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
