import {useState} from 'react'
import {useForm} from 'react-hook-form'

import FormGroup from './FormGroup'

import * as S from './style'

const LoginForm = () => {
  const [message, setMessage] = useState()
  const {errors, handleSubmit, register} = useForm({mode: 'onChange'})

  const onSubmit = async (data) => {

  }

  return (
    <S.Form
      encType='multipart/form-data'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Log In</h2>
    
      {message 
        ? <div>{message}</div>
        : null
      }

      <FormGroup 
        type='text'
        name='username'
        label='Username:'
        placeholder='Username'
        error={errors?.username?.message}
        ref={register({
          required: {
            value: true,
            message: 'Username is required to log in.'
          }
        })}
      />

      <FormGroup
        type='password'
        name='password'
        label='Password:'
        placeholder='Password'
        error={errors?.password?.message}
        ref={register({
          required: {
            value: true,
            message: 'Password is required to log in.'
          }
        })}
      />

      <S.FormSubmit
        type='submit'
        value='Register'
      />
    </S.Form>
  )
}

export default LoginForm