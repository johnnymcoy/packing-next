import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


const MenuOptions = [
    {
        title: "Dashboard",
        buttons: [
            {
                title: "Home",
                link: "/"
            },
            {
                title: "Dashboard",
                link: "/dashboard"
            }
        ]
    },
    {
        title: "Orders",
        buttons: [
            {
                title: "Items",
                link: "/items"
            },
            {
                title: "Orders",
                link: "/orders",
            },
            {
                title: "Postage",
                link: "/postage"
            },
            {
                title: "Settings",
                link: "/settings"
            }
        ]
    },
    // {
    //     title: "Items",
    //     buttons: [
    //         {
    //             title: "Add Stock Item",
    //             link: "/items/add-item"
    //         },
    //         {
    //             title: "Show Items",
    //             link: "/items/show-items"
    //         }
    //     ]
    // },
    // {
    //     title: "Orders",
    //     buttons: [
    //         {
    //             title: "Add Order",
    //             link: "/orders/add-order"
    //         },
    //         {
    //             title: "Show Orders",
    //             link: "/orders/show-orders"
    //         }
    //     ]
    // },
    // {
    //     title: "Postage",
    //     buttons: [
    //         {
                
    //             title: "Add Custom Package",
    //             link: "/postage/add-custom-option"
    //         },
    //         {
    //             title: "Add Preset Options",
    //             link: "/postage/add-option"
    //         },
    //         {
    //             title: "Show Postage Options",
    //             link: "/postage/options"
    //         },
    //     ]
    // },
    {
        title: "Results",
        buttons: [
            {
                title: "Calculate Results",
                link: "/results",
                disabled: false
            },
            {
                title: "Show 3D Visual",
                link: "/visualisation",
                disabled: true
            }
        ]
    },
    {
        title: "Feedback",
        buttons: [
            {
                title: "Report Bug",
                link: "/feedback"
            }
        ]
    },
    {
        title: "Help",
        buttons: [
            {
                title: "Help",
                link: "/help"
            },
            {
                title: "Version",
                link: "/help/version"
            },
            {
                title: "Tutorials",
                link: "/help/tutorials"
            }
        ]
    }

]

const layoutSlice = createSlice({
    name: "layout",
    initialState: MenuOptions,
    reducers: {
        openModal(state, action){
            
        }

    }
});


export const layoutActions = layoutSlice.actions;
export default layoutSlice.reducer;
