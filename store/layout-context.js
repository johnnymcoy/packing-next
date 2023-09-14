import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


const MenuOptions = [
    {
        title: "Orders",
        buttons: [
            {
                title: "Add Order",
                link: "/orders/add-order"
            },
            {
                title: "Show Orders",
                link: "/orders/show-orders"
            }
        ]
    },
    {
        title: "Postage",
        buttons: [
            {
                title: "Postage Options",
                link: "/postage/options"
            },
            {
                title: "Add Postage Options",
                link: "/postage/add-option"
            },
            {
           
                title: "Custom Postage Options",
                link: "/postage/add-custom-option"
            }
        ]
    },
    {
        title: "Results",
        buttons: [
            {
                title: "Calculate Results",
                link: "/results"
            }
        ]
    },
    {
        title: "Visualisation",
        buttons: [
            {
                title: "Show 3D Visual",
                link: "/visualisation"
            }
        ]
    }
]

const layoutSlice = createSlice({
    name: "layout",
    initialState: MenuOptions,
    reducers: {

    }
});


export const layoutActions = layoutSlice.actions;
export default layoutSlice.reducer;
