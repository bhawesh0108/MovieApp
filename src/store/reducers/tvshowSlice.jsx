import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info:null,
}

export const tvshowSlice = createSlice({
    name: 'tvshow',
    initialState,
    reducers: {
        loadTvshow:(state,action)=>{
            state.info = action.payload;
        },
        removeTvshow:(state,action)=>{
            state.info = null;
        }

    },
  })

  export const {loadTvshow,removeTvshow} = tvshowSlice.actions;

  export default tvshowSlice.reducer;