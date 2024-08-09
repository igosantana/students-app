import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'
import { TextField, Grid, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useStudent } from '../../contexts/StudentsContext'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

const ModalCreateStudent = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { createStudent } = useStudent()
  const { accessToken } = useAuth()

  const onSubmit = async (data) => {
    const formattedDate = new Date(data.dataNascimento)
      .toISOString()
      .split('.')[0]

    const newData = {
      ...data,
      dataNascimento: formattedDate,
      idade: parseInt(data.idade, 10),
      notaMedia: parseFloat(data.notaMedia),
      serie: parseInt(data.serie, 10),
    }

    createStudent(newData, accessToken).then(() => handleClose())
    toast.success('Estudante criado com sucesso!')
  }

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Grid
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: '450px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '6px',
          }}
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item xs={12}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Cadastrar novo estudante
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="nome"
              id="nome"
              label="Nome"
              {...register('nome', {
                required: 'Nome é obrigatório',
              })}
              error={!!errors?.nome}
              helperText={errors?.nome?.message}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              name="idade"
              id="idade"
              label="Idade"
              type="number"
              {...register('idade', {
                required: 'Idade é obrigatória',
              })}
              error={!!errors?.age}
              helperText={errors?.age?.message}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Data de Nascimento"
              type="date"
              name="dataNascimento"
              id="birthdate"
              InputLabelProps={{ shrink: true }}
              {...register('dataNascimento', {
                required: 'Data de Nascimento é obrigatória',
              })}
              error={!!errors?.dataNascimento}
              helperText={errors?.dataNascimento?.message}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              name="serie"
              id="serie"
              label="Série"
              {...register('serie', {
                required: 'Série é obrigatória',
              })}
              error={!!errors.serie}
              helperText={errors?.serie?.message}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              label="Nota Média"
              type="number"
              id="notaMedia"
              name="notaMedia"
              {...register('notaMedia', {
                required: 'Nota Média é obrigatória',
              })}
              error={!!errors?.notaMedia}
              helperText={errors?.notaMedia?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="endereco"
              id="endereco"
              label="Endereço"
              {...register('endereco', {
                required: 'Endereço é obrigatório',
              })}
              error={!!errors?.endereco}
              helperText={errors?.endereco?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="nomePai"
              id="nomePai"
              label="Nome do Pai"
              {...register('nomePai', {
                required: 'Nome do Pai é obrigatório',
              })}
              error={!!errors?.nomePai}
              helperText={errors?.nomePai?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="nomeMae"
              id="nomeMae"
              label="Nome da Mãe"
              {...register('nomeMae', {
                required: 'Nome da Mãe é obrigatória',
              })}
              error={!!errors?.nomeMae}
              helperText={errors?.nomeMae?.message}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}
          >
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </div>
  )
}

ModalCreateStudent.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default ModalCreateStudent
