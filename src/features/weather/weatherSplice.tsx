import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const IOT_URL = 'https://api.open-meteo.com/v1/forecast?latitude=1.29&longitude=103.85&hourly=relativehumidity_2m,direct_radiation&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&start_date=2023-10-01&end_date=2023-10-10'

interface AppState {
    data: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'completed' | 'pending' | 'update' | 'failed';
    error: null | Error;
}
const initialState : AppState = {
    data: null,
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchWeatherData  = createAsyncThunk('weather/fetchWeatherData', async () => {
    const response:any = axios.get(IOT_URL);
    let _result = (await response).data;
    if (_result) {
        localStorage.setItem('weatherData', JSON.stringify(_result));
    } 
    return _result;
})
function loadLocalData() {
    const storedData = localStorage.getItem('weatherData');
    return storedData ? JSON.parse(storedData) : null;
}
const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchWeatherData.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'succeeded'
            })
            .addCase(fetchWeatherData.rejected, (state,action) => {
                let _oldData = loadLocalData();
                state.status = 'failed';
                if (_oldData) state.data = _oldData;
            })
    }
})

export const getWeatherData = (state:any) => state.weather.data;
export const getLoadingStatus = (state:any) => state.weather.status;

export const {  } = weatherSlice.actions

export default weatherSlice.reducer