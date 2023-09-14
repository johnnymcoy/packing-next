import { configureStore } from "@reduxjs/toolkit"
import layoutReducer from "./layout-context";
import orderReducer from "./orders-context"
import packageReducer from "./packages-context"
import resultsReducer from "./results-context"

const store = configureStore({
    reducer: {
        layout: layoutReducer, 
        orders: orderReducer,
        packages: packageReducer,
        results: resultsReducer
    }
});

export default store;