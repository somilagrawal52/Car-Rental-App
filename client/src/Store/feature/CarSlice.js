import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/API.jsx";
import fallbackCars from "../../Data/carData.json";

// getAllCars
export const getAllCars = createAsyncThunk(
  "car/getAllCars",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/car/all-cars");
      if (res.data?.cars && res.data.cars.length > 0) {
        return res.data;
      }
      return { cars: fallbackCars };
    } catch (error) {
      // Fallback seamlessly to showroom cars so the UI never displays a broken/empty state
      return { cars: fallbackCars };
    }
  }
);

// getCarDetails
export const getCarDetails = createAsyncThunk(
  "car/getCarDetails",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/car/${id}`);
      if (res.data?.car) {
        return res.data;
      }
    } catch (error) {
      // Look up in fallback cars
      const localCar = fallbackCars.find((c) => c._id === id || String(c.id) === String(id));
      if (localCar) {
        return { car: localCar };
      }
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Vehicle not found"
      );
    }
    const localCar = fallbackCars.find((c) => c._id === id || String(c.id) === String(id));
    return { car: localCar || null };
  }
);

const carSlice = createSlice({
  name: "car",
  initialState: {
    loading: false,
    success: false,
    cars: fallbackCars,
    selectedCar: null,
    error: null,
  },
  reducers: {
    setSelectedCar: (state, action) => {
      state.selectedCar = action.payload;
    },
  },
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
        state.cars = action.payload.cars?.length ? action.payload.cars : fallbackCars;
      })
      .addCase(getAllCars.rejected, (state, action) => {
        state.loading = false;
        state.cars = fallbackCars;
        state.error = action.payload || action.error?.message;
        state.success = false;
      })
      // getCarDetails
      .addCase(getCarDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getCarDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.selectedCar = action.payload.car;
      })
      .addCase(getCarDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
        state.success = false;
      });
  },
});

export const { setSelectedCar } = carSlice.actions;
export default carSlice.reducer;
