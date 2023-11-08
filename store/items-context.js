import { createSlice } from '@reduxjs/toolkit';


const initialStateNew = {
    items: [
        {
            id: "ord1240sx",
            name: "Item-01", 
            width: 0.6, 
            depth: 2, 
            height: 0.4, 
            weight: 1,
            get volume() {
                return this.width * this.depth * this.height;
            }
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
            weight: 1,
            get volume() {
                return this.width * this.depth * this.height;
            }
        },
        {
            id: "235981x",
            name: "Item-03", 
            width: 1.45, 
            depth: 2.65, 
            height: 0.55, 
            weight: 1,
            get volume() {
                return this.width * this.depth * this.height;
            }

        }
    ],
}


const itemSlice = createSlice({
    name: "items",
    initialState: initialStateNew,
    reducers: {
        addItem(state, action){
            const item = action.payload;
            const existingItem = state.items.find(itemIndex => itemIndex.id === item.id);
            if(!existingItem)
            {
                state.items.push({
                    id: item.id,
                    name: item.name,
                    width: item.width,
                    depth: item.depth,
                    height: item.height,
                    weight: item.weight,
                    get volume() {
                        return this.width * this.depth * this.height;
                    }
        
                })
            }else{
                existingItem.amount++;
                existingItem.totalWeight += item.weight;
            }
        },
        deleteItem(state, action){
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },
        clearItems(state, action){
            state.items = [];
        },
    }
});


export const itemActions = itemSlice.actions;
export default itemSlice.reducer;
