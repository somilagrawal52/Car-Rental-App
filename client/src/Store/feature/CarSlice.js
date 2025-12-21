import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/API.jsx";

//getAllCars
export const getAllCars = createAsyncThunk(
  "car/getAllCars",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/car/all-cars");
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

//getCarDetails
export const getCarDetails = createAsyncThunk(
  "car/getCarDetails",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/car/${id}`);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const carSlice = createSlice({
  name: "car",
  initialState: {
    loading: false,
    success: false,
    cars: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCars.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.cars = action.payload.cars;
      })
      .addCase(getAllCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
        state.success = false;
      })
      //getcardetails
      .addCase(getCarDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getCarDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.cars = action.payload.cars;
      })
      .addCase(getCarDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
        state.success = false;
      });
  },
});

export default carSlice.reducer;
