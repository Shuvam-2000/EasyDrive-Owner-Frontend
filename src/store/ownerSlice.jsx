import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
    name: "owner",
    initialState:{
        owner: null,
        ownerCar: [],
        ownerBookings: [],
    },
    reducers:{
        setOwner: (state, action) => {
            state.owner = action.payload
        },
        logout: (state) => {
            state.owner = null
            state.ownerCar = []
            state.ownerBookings = []
        },
        setOwnerCar: (state, action) => {
            state.ownerCar = action.payload
        },
        setOwnerBookings: (state, action) => {
            state.ownerBookings = action.payload
        }
    }
})

export const { setOwner, logout, setOwnerCar, setOwnerBookings } = ownerSlice.actions;
export default ownerSlice.reducer;