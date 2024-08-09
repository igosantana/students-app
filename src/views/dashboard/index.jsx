import { useEffect, useState } from 'react'
import { Typography, Grid, Button, Pagination } from '@mui/material'
import StudentList from './students-list'
import { useStudent } from '../../contexts/StudentsContext'
import { useAuth } from '../../contexts/AuthContext'
import Logo from '../../assets/logo_principal.png'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalCreateStudent from '../../components/modal-create-student'
import ModalUpdateStudent from '../../components/modal-update-student'

const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [studentId, setStudentId] = useState('')
  const { students, loadStudents } = useStudent()
  const { accessToken, signOut } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await loadStudents(accessToken, currentPage)

      if (response) {
        setTotalPages(response.totalPages)
      }
    }

    fetchStudents()
  }, [accessToken, currentPage, loadStudents])

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const handleOpen = () => setOpen(true)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleClose = () => setOpen(false)
  const handleCloseEdit = () => setOpenEdit(false)

  return (
    <>
      <Grid
        container
        sx={{ height: '100vh', width: '100%', flexFlow: 'column' }}
      >
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            widhh: '100%',
            padding: '24px 16px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
          }}
        >
          <Grid>
            <img
              style={{ width: '60px', height: '60px' }}
              src={Logo}
              alt="Logo"
            />
          </Grid>
          <Grid>
            <Button onClick={handleOpen}>Adicionar estudante</Button>
            <Button onClick={signOut}>Sair</Button>
          </Grid>
        </Grid>
        <Grid sx={{ flex: 1, padding: '24px 16px' }}>
          <Grid>
            <Typography
              sx={{ fontWeight: 'bold', fontSize: '24px', color: '#B5DAFF' }}
            >
              Listagem de estudantes
            </Typography>
          </Grid>
          <Grid>
            <StudentList
              students={students}
              setStudentId={setStudentId}
              handleOpenEdit={handleOpenEdit}
            />
          </Grid>
          <Grid container justifyContent="center" sx={{ marginTop: '16px' }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      {open && <ModalCreateStudent open={open} handleClose={handleClose} />}
      {openEdit && studentId !== '' && (
        <ModalUpdateStudent
          studentId={studentId}
          handleClose={handleCloseEdit}
          open={openEdit}
        />
      )}
    </>
  )
}

export default Dashboard
