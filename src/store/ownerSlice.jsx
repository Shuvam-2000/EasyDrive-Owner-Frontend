import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
    name: "owner",
    initialState:{
        owner: null
    },
    reducers:{
        setOwner: (state, action) => {
            state.owner = action.payload
        }
    }
})

export const { setOwner } = ownerSlice.actions;
export default ownerSlice.reducer;