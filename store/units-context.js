import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    weight: "kg",
    measurement: "m",
}

const weights = ["g", "kg", "oz", "lbs"]
const measurements = ["mm", "cm", "m", "ft", "in"]


const unitSlice = createSlice({
    name: "unit",
    initialState: initialState,
    reducers: {
        changeWeight(state, action){

        },
        changeMeasurement(state, action){
            
        }
    }
});


export const unitActions = unitSlice.actions;
export default unitSlice.reducer;
