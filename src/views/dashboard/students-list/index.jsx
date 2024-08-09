import { Grid } from '@mui/material'
import StudentCard from './card'
import PropTypes from 'prop-types'

const StudentList = ({ students, setStudentId, handleOpenEdit }) => {
  return (
    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          setStudentId={setStudentId}
          handleOpenEdit={handleOpenEdit}
        />
      ))}
    </Grid>
  )
}

StudentList.propTypes = {
  students: PropTypes.array.isRequired,
  setStudentId: PropTypes.func.isRequired,
  handleOpenEdit: PropTypes.func.isRequired,
}

export default StudentList
