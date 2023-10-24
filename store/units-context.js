import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    weight: "kg",
    measurement: "m",
    decimalPlaces: 2,
}

const weights = ["g", "kg", "oz", "lb"]
const measurements = ["mm", "cm", "m", "ft", "in"]



const unitSlice = createSlice({
    name: "unit",
    initialState: initialState,
    reducers: {
        changeWeight(state, action){
            console.log(action.payload)
            switch(action.payload)
            {
                case "Kilogram": 
                    state.weight = "kg"
                    break;
                case "Grams":
                    state.weight = "g"
                    break;
                case "Ounce":
                    state.weight = "oz"
                    break;
                case "Pound":
                    state.weight = "lb"
                    break;
                default: 
                    state.weight = "g"
                    break;
            }
        },
        changeMeasurement(state, action){
            console.log(action.payload)
            switch(action.payload)
            {
                case "Meters": 
                    state.measurement = "m"
                    break;
                case "Centimetres": 
                    state.measurement = "cm"
                    break;
                case "Millimeters": 
                    state.measurement = "mm"
                    break;
                case "Feet": 
                    state.measurement = "ft"
                    break;
                case "Inches": 
                    state.measurement = "in"
                    break;
                default: 
                    state.measurement = "m"
                    break;

            }
        },
        changeDecimalPlaces(state, action){
            const decimals = action.payload;
            state.decimalPlaces = decimals;
        }
    }
});


export const unitActions = unitSlice.actions;
export default unitSlice.reducer;
