import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../../api/studentApi'

export const getStudents = createAsyncThunk(
  'students/getStudents',
  async () => {
    const response = await fetchStudents()
    return response
  },
)

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (student) => {
    const response = await createStudent(student)
    return response
  },
)

export const editStudent = createAsyncThunk(
  'students/editStudent',
  async (student) => {
    const response = await updateStudent(student)
    return response
  },
)

export const removeStudent = createAsyncThunk(
  'students/removeStudent',
  async (id) => {
    await deleteStudent(id)
    return id
  },
)

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (student) => student.id === action.payload.id,
        )
        state.list[index] = action.payload
      })
      .addCase(removeStudent.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (student) => student.id !== action.payload,
        )
      })
  },
})

export default studentSlice.reducer
