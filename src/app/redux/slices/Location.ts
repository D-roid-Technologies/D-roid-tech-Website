import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationState } from "../../utils/Types";


const initialState: LocationState = {
    city: "",
    continent: "",
    continentCode: "",
    countryCode: "",
    countryName: "",
    latitude: 0,
    locality: "",
    localityInfo: { administrative: [], informative: [] },
    localityLanguageRequested: "",
    longitude: 0,
    lookupSource: "",
    plusCode: "",
    postcode: "",
    principalSubdivision: "",
    principalSubdivisionCode: "",
};

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        addLocation(state, action: PayloadAction<LocationState>) {
            state.city = action.payload.city;
            state.continent = action.payload.continent;
            state.continentCode = action.payload.continentCode;
            state.countryCode = action.payload.countryCode;
            state.countryName = action.payload.countryName;
            state.latitude = action.payload.latitude;
            state.locality = action.payload.locality;
            state.localityInfo = action.payload.localityInfo;
            state.localityLanguageRequested = action.payload.localityLanguageRequested;
            state.longitude = action.payload.longitude;
            state.lookupSource = action.payload.lookupSource;
            state.plusCode = action.payload.plusCode;
            state.postcode = action.payload.postcode;
            state.principalSubdivision = action.payload.principalSubdivision;
            state.principalSubdivisionCode = action.payload.principalSubdivisionCode;
            console.log(state.city, state.postcode)
        }
    }


})

export const { addLocation } = locationSlice.actions