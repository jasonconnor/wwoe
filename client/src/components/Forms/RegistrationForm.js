import {useForm} from 'react-hook-form'

import FormGroup from './FormGroup'

import * as S from './style'

const RegistrationForm = () => {
  const {errors, handleSubmit, register} = useForm({mode: 'onChange'})

  const onSubmit = async (data) => {
    const formData = new FormData()

    formData.append('username', data.username)
    formData.append('password', data.password)

    console.log(formData)
  }

  return (
    <S.Form
      encType='multipart/form-data'
      onSubmit={handleSubmit(onSubmit)}
    >
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