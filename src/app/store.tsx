import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice';
import sensorsReducer from '../features/sensors/sensorsSlice';
import usersReducer from '../features/users/usersSlice';
import alertsReducer from '../features/alerts/alertsSlice';
import weatherReducer from "../features/weather/weatherSplice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        weather: weatherReducer
    }
})