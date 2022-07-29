import {
    ADD_DEVICE,
    GET_DEVICE,
    GET_DEVICE_USER,
    GET_DEVICES_COUNTERS,
    GET_SINGLE_DEVICE_USER,
    GET_COUNTER_USER,
    GET_SETTINGS_BASIC, GET_SETTINGS_EXTENDED
} from "../types"

const initialState = {
    device: [],
    deviceData:[],
    getDevicesCounters:[],
    getDeviceUser:[],
    getSingleDeviceUser:[],
    getCounter:[],
    getSettingsBasic:[],
    getSettingsBasicSchedule:[],
    getSettingsBasicTariff:[],
    getAdvancedSettings:[]
}

export const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DEVICE:
            return {
                ...state,
                device: action.payload
            }
        case  GET_DEVICE:
            return {
                ...state,
                deviceData: action.payload
            }
        case GET_DEVICES_COUNTERS:
            return {
                ...state,
                getDevicesCounters: action.payload
            }
        case GET_DEVICE_USER:
            return {
                ...state,
                getDeviceUser:action.payload
            }
        case GET_SINGLE_DEVICE_USER:
            return {
                ...state,
                getSingleDeviceUser:action.payload
            }
        case GET_COUNTER_USER:
            return {
                ...state,
                getCounter:action.payload
            }
        case GET_SETTINGS_BASIC:
            return {
                ...state,
                getSettingsBasic:action.payload[0],
                getSettingsBasicSchedule:action.payload[0].schedule,
                getSettingsBasicTariff:action.payload[0].tariff
            }
        case GET_SETTINGS_EXTENDED:
            return {
                ...state,
                getAdvancedSettings:action.payload
            }
        default:
            return state
    }
}