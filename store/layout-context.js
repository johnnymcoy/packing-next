import { createSlice, } from '@reduxjs/toolkit';


const MenuOptions = {
    items: [
    {
        title: "Dashboard",
        buttons: [
            {
                title: "Home",
                link: "/"
            },
            {
                title: "Dashboard",
                link: "/dashboard",
                disabled: true
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
                disabled: false
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
    }],
    bBurgerOpen: false,
}

const layoutSlice = createSlice({
    name: "layout",
    initialState: MenuOptions,
    reducers: {
        openModal(state, action){
            
        },
        toggleBurgerMenu(state){
            state.bBurgerOpen = !state.bBurgerOpen;
        }
    }
});


export const layoutActions = layoutSlice.actions;
export default layoutSlice.reducer;
