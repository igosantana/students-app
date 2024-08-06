import axiosInstance from './axiosConfig'

export const fetchStudents = async () => {
  const response = await axiosInstance.get('/students')
  return response.data
}

export const createStudent = async (student) => {
  const response = await axiosInstance.post('/students', student)
  return response.data
}

export const updateStudent = async (student, id) => {
  const response = await axiosInstance.put(`/students/${id}`, student)
  return response.data
}

export const deleteStudent = async (id) => {
  const response = await axiosInstance.delete(`/students/${id}`)
  return response.data
}
