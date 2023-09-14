import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    results: [
        {
            bin: {
                bFitEverything: false,
                bIsEmpty: false,
                depth: "36.000",
                emptyVolume: "8368.000000000",
                height: "8.000",
                itemsLeft: 1,
                itemsVolume: "2000.000000000",
                name: "Example Postage Box",
                totalWeight: "2.500",
                volume: "10368.000000000",
                weight: "0.000",
                width: "36.000"
            },
            items: [
                {
                    depth: "20.000",
                    height: "5.000",
                    name: "Order ID",
                    position: Array(3) [ 0, 0, 0 ],
                    rotation: Array(3) [ 0, 0, 0 ],
                    volume: "2000.000000000",
                    weight: "2.500",
                    width: "20.000"
                }
            ]
        }
]
}

const resultsSlice = createSlice({
    name: "results",
    initialState: initialState,
    reducers: {
        setResults(state, action){
            state.results = action.payload;
        },
    }
});


export const resultsActions = resultsSlice.actions;
export default resultsSlice.reducer;
