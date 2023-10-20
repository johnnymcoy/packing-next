import { createSlice } from '@reduxjs/toolkit';




const initialStateNew = {
    packages: [
        {
            id: "example_01",
            name: "Example Postage Box", 
            width: 8, 
            depth: 5, 
            height: 2, 
            weight: 100
        }
    ],
    // totalOptions: 0,
    // totalWeight: 0,
}


const AusPostOptions = [
    {id: "Sig Baby", name: "Sig Baby", width: 16.5, depth: 16.5, height: 5, amount: 1, weight: 100},
    {id: "Sig Low", name: "Sig Low", width: 16.5, depth: 16.5, height: 10, amount: 1, weight: 100},
    {id: "Sig Medium", name: "Sig Medium", width: 16.5, depth: 16.5, height: 20, amount: 1, weight: 100},
    {id: "Sig Tall", name: "Sig Tall", width: 16.5, depth: 16.5, height: 26.5, amount: 1, weight: 100},
    {id: "Bedrock", name: "Bedrock", width: 48, depth: 24, height: 11, amount: 1, weight: 100},
    {id: "mc210",name: "mc210", width: 21, depth: 21, height: 21, amount: 1, weight: 100},
    {id: "small shell", name: "small shell", width: 28, depth: 22, height: 11.5, amount: 1, weight: 100},
    {id: "A4", name: "A4", width: 30.5, depth: 21.5, height: 28, amount: 1, weight: 100},
    {id: "MC Little Kev",name: "MC Little Kev", width: 35, depth: 35, height: 21, amount: 1, weight: 100},
    {id: "CMF",name: "CMF", width: 35, depth: 30, height: 36, amount: 1, weight: 100},
    {id: "New Twin Baxter",name: "New Twin Baxter", width: 36, depth: 27, height: 18, amount: 1, weight: 100},
    {id: "PF283/2", name: "PF283/2", width: 40, depth: 28.3, height: 18.5, amount: 1, weight: 100},
    {id: "PF283/4", name: "PF283/4", width: 40, depth: 28.3, height: 28.3, amount: 1, weight: 100},
    {id: "Woodchick", name: "Woodchick", width: 50, depth: 30, height: 28, amount: 1, weight: 100},
    {id: "WWW", name: "WWW", width: 60, depth: 40, height: 25, amount: 1, weight: 100},
    {id: "Han 1", name: "Han 1", width: 60, depth: 40, height: 35, amount: 1, weight: 100},
    {id: "New Shipper 36", name: "New Shipper 36", width: 60, depth: 50, height: 50, amount: 1, weight: 100},
    {id: "Shipper 1.1", name: "Shipper 1.1", width: 70, depth: 40, height: 30, amount: 1, weight: 100},
    {id: "Eager", name: "Eager", width: 72, depth: 32, height: 37, amount: 1, weight: 100},
]

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
                    id: item.id,
                    name: item.name,
                    width: item.width,
                    depth: item.depth,
                    height: item.height,
                    weight: item.weight
                })
            }
        },
        removeItem(state, action){
            const id = action.payload;
            const existingItem = state.packages.find(itemIndex => itemIndex.id === id);
            state.packages = state.packages.filter(item => item.id !== id)
        },
        addMultipleOptions(state, action){
            if(action.payload === "AusPost")
            {
                for(let i = 0; i < AusPostOptions.length; i++)
                {
                    const item = AusPostOptions[i];
                    const existingItem = state.packages.find(itemIndex => itemIndex.name === item.name);
                    if(!existingItem)
                    {
                        state.packages.push({
                            id: item.id,
                            name: item.name,
                            width: item.width,
                            depth: item.depth,
                            height: item.height,
                            weight: item.weight
                        })
                    }
                }
                console.log("AusPost")
            }
            if(Array.isArray(action.payload))
            {
                for(let i = 0; i < action.payload.length; i++)
                {
                    addItem((action.payload[i]));
                }
            }    
        },
    }
});


export const packageActions = packageSlice.actions;
export default packageSlice.reducer;
