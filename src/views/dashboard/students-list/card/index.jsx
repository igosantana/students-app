import {
  CardContent,
  Typography,
  Grid,
  CardHeader,
  CardActions,
  Button,
} from '@mui/material'
import Card from '@mui/material/Card'
import { formatDate } from '../../../../utils/formatDate'
import { useStudent } from '../../../../contexts/StudentsContext'
import { useAuth } from '../../../../contexts/AuthContext'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

const StudentCard = ({ student, setStudentId, handleOpenEdit }) => {
  const { accessToken } = useAuth()
  const { deleteStudent } = useStudent()
  const formattedDate = formatDate(student?.dataNascimento)

  const handleDeleteStudent = async () => {
    await deleteStudent(student.id, accessToken)
    toast.success('Estudante excluído com sucesso!')
  }

  const handleEditStudent = () => {
    setStudentId(student.id)
    handleOpenEdit()
  }

  return (
    <>
      <Grid item xs={6} sm={4}>
        <Card>
          <CardHeader title={student?.nome} subheader={formattedDate} />
          <CardContent
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Grid>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Idade: {student?.idade}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Série: {student?.serie}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Média: {student?.notaMedia}
              </Typography>
            </Grid>
            <Grid>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Nome da mãe: {student?.nomeMae}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Nome do pai: {student?.nomePai}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Endereço: {student?.endereco}
              </Typography>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleEditStudent}>
              EDITAR
            </Button>
            <Button size="small" color="error" onClick={handleDeleteStudent}>
              EXCLUIR
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}

StudentCard.propTypes = {
  student: PropTypes.object,
  setStudentId: PropTypes.func,
  handleOpenEdit: PropTypes.func,
}

export default StudentCard
