import { createSlice } from '@reduxjs/toolkit';




const initialStateNew = {
    packages: [
        {
            name: "Example Postage Box", 
            width: 8, 
            depth: 5, 
            height: 2, 
            maxWeight: 100
        }
    ],
    // totalOptions: 0,
    // totalWeight: 0,
}

const packageSlice = createSlice({
    name: "packages",
    initialState: initialStateNew,
    reducers: {
        addItem(state, action){
            const item = action.payload;
            const existingItem = state.packages.find(itemIndex => itemIndex.name === item.name);
            if(!existingItem)
            {
                state.packages.push({
                    name: item.name,
                    width: item.width,
                    depth: item.depth,
                    height: item.height,
                    maxWeight: item.maxWeight
                })
            }
        },
        removeItem(state, action){
            const name = action.payload;
            const existingItem = state.packages.find(itemIndex => itemIndex.name === name);
            state.packages = state.packages.filter(item => item.name !== name)
        }
    }
});


export const packageActions = packageSlice.actions;
export default packageSlice.reducer;
