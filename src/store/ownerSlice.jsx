import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
    name: "owner",
    initialState:{
        owner: null,
        ownerCar: []
    },
    reducers:{
        setOwner: (state, action) => {
            state.owner = action.payload
        },
        logout: (state) => {
            state.owner = null
            state.ownerCar = []
        },
        setOwnerCar: (state, action) => {
            state.ownerCar = action.payload
        }
    }
})

export const { setOwner, logout, setOwnerCar } = ownerSlice.actions;
export default ownerSlice.reducer;