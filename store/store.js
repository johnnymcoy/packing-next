import { configureStore } from "@reduxjs/toolkit"
import layoutReducer from "./layout-context";
import orderReducer from "./orders-context"
import packageReducer from "./packages-context"
import resultsReducer from "./results-context"
import itemReducer from "./items-context"
import unitReducer from "./units-context"

const store = configureStore({
    reducer: {
        layout: layoutReducer, 
        orders: orderReducer,
        packages: packageReducer,
        results: resultsReducer,
        items: itemReducer,
        units: unitReducer
    }
});

export default store;