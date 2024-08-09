import { createContext, useContext, useState, useCallback } from 'react'
import { api } from '../services/api'

const StudentContext = createContext({})

const useStudent = () => {
  const context = useContext(StudentContext)

  if (!context) {
    throw new Error('useStudent must be used within an StudentProvider')
  }

  return context
}

const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([])
  const [student, setStudent] = useState()

  const loadStudents = useCallback(
    async (accessToken, pageNumber = 1, pageSize = 10) => {
      try {
        const response = await api.get(
          `/students?pageNumber=${pageNumber}&pageSize=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        setStudents(response.data.data)
        const totalPages = Math.ceil(response.data.totalRecords / pageSize)

        return { totalPages, pageNumber }
      } catch (err) {
        console.log(err)
      }
    },
    [],
  )

  const getStudent = useCallback(async (studentId, accessToken) => {
    api
      .get(`/students/${studentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => setStudent(() => response.data))
      .catch((err) => console.log(err))
  }, [])

  const createStudent = useCallback(async (data, accessToken) => {
    api
      .post('/students', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) =>
        setStudents((oldStudents) => [...oldStudents, response.data]),
      )
      .catch((err) => console.log(err))
  }, [])

  const deleteStudent = useCallback(
    async (studentId, accessToken) => {
      await api
        .delete(`/students/${studentId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          const filteredStudents = students.filter(
            (student) => student.id !== studentId,
          )
          setStudents(filteredStudents)
        })
        .catch((err) => console.log(err))
    },
    [students],
  )

  const updateStudent = useCallback(
    async (student, studentId, accessToken) => {
      await api
        .patch(`/students/${studentId}`, student, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          const filteredStudents = students.filter(
            (student) => student.id !== studentId,
          )
          const student = students.find((student) => student.id === studentId)

          if (student) {
            setStudents([...filteredStudents, student])
          }
        })
        .catch((err) => console.log(err))
    },
    [students],
  )

  return (
    <StudentContext.Provider
      value={{
        students,
        createStudent,
        loadStudents,
        deleteStudent,
        updateStudent,
        getStudent,
        student,
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export { useStudent, StudentProvider }
