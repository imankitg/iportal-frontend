import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import internshipService from './internshipService'

const initialState = {
  internships: [],
  mode: 'create',
  selectedInternship: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new internship
export const createInternship = createAsyncThunk(
  'internships/create',
  async (internshipData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await internshipService.createInternship(internshipData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get internships
export const getInternships = createAsyncThunk(
  'internships/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await internshipService.getInternships(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update Internship
export const updateInternship = createAsyncThunk(
  'internship/update',
  async (data, thunkAPI) => {
    try {
      const {id, internshipData} = data 
      const token = thunkAPI.getState().auth.user.token
      await internshipService.updateInternship(id, internshipData, token)
      return await internshipService.getInternships(token)

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  } 
)

// Delete internship
export const deleteInternship = createAsyncThunk(
  'internship/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await internshipService.deleteInternship(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const internshipSlice = createSlice({
  name: 'internship',
  initialState,
  reducers: {
    reset: (state) => initialState,
    selInternship: (state, action) => {
      state.selectedInternship = action.payload
    },
    changeMode: (state, action) => {
      state.mode = action.payload
    },
    resetMode: (state) => {
      state.mode = initialState.mode
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInternship.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createInternship.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.internships.push(action.payload)
      })
      .addCase(createInternship.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getInternships.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getInternships.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.internships = action.payload
      })
      .addCase(getInternships.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateInternship.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateInternship.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.internships = action.payload
      })
      .addCase(updateInternship.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteInternship.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteInternship.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.internships = state.internships.filter(
          (internship) => internship._id !== action.payload.id
        )
      })
      .addCase(deleteInternship.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, selInternship, changeMode, resetMode } = internshipSlice.actions
export default internshipSlice.reducer
