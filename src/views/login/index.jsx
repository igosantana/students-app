import { Typography, Box, TextField, Button, Paper, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { signIn } = useAuth()
  const history = useHistory()

  const onSubmit = useCallback(
    async (data) => {
      signIn(data).then(() => history.push('/dashboard'))
    },
    [signIn, history],
  )

  return (
    <Grid
      container
      maxWidth="xs"
      sx={{
        width: '100%',
        heigth: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px',
          maxWidth: '400px',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            error={!!errors.username}
            helperText={errors?.username?.message}
            id="username"
            label="Usuário"
            name="username"
            autoComplete="username"
            autoFocus
            {...register('username', {
              required: 'Usuário é um campo obrigatório',
            })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            error={!!errors.password}
            helperText={errors?.password?.message}
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password', {
              required: 'Senha é um campo obrigatório',
            })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#008FD5' }}
          >
            ENTRAR
          </Button>
        </Box>
      </Paper>
    </Grid>
  )
}

export default Login
