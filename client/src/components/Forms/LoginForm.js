import {useState} from 'react'
import {useForm} from 'react-hook-form'

import FormGroup from './FormGroup'
import LoginService from '../../services/LoginService'

import * as S from './style'

const LoginForm = ({history}) => {
  const [formError, setFormError] = useState('')
  const {errors, handleSubmit, register} = useForm({mode: 'onChange'})

  const onSubmit = async (data, event) => {
    try {
      await LoginService(data)
      history.push('/profile')
    } catch(error) {
      setFormError(error)
    }

    event.target[1].value =''
  }

  return (
    <S.Form
      encType='multipart/form-data'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Log In</h2>
    
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
        value='Login'
      />
    </S.Form>
  )
}

export default LoginForm