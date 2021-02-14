import {useState} from 'react'
import {useForm} from 'react-hook-form'

import FormGroup from './FormGroup'
import RegistrationService from '../../services/RegistrationService'

import * as S from './style'

const RegistrationForm = ({history}) => {
  const [formError, setFormError] = useState('')
  const {errors, handleSubmit, register, reset} = useForm({mode: 'onChange'})

  const onSubmit = async (data) => {
    try {
      await RegistrationService(data)
      // TODO: change registration to provide access token, then push to
      //       admin dashboard
      history.push('/login')
    } catch(error) {
      console.error(error)
      setFormError(error)
    }

    reset()
  }

  return (
    <S.Form
      encType='multipart/form-data'
      onSubmit={handleSubmit(onSubmit)}
    >

      <h2>Register</h2>

      {formError 
        ? <div>{formError}</div>
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
            message: 'Username is required to create an account.'
          },
          maxLength: {
            value: 20,
            message: 'Username cannot be longer than 20 characters.'
          },
          minLength: {
            value: 4,
            message: 'Username must be at least 4 characters long.'
          },
          pattern: {
            value: /^[A-Za-z0-9-_]*$/,
            message: 'Username cannot include special characters.'
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
            message: 'Password is required to create an account.'
          },
          maxLength: {
            value: 20,
            message: 'Password cannot be longer than 20 characters.'
          },
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long.'
          },
          pattern: {
            value: /^[A-Za-z0-9!@#$%^&*]*$/,
            message: 'Password can only contain certain special characters.'
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

export default RegistrationForm