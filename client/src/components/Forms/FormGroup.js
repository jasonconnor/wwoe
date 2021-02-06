import React from 'react'

import * as S from './style'

const FormGroup = React.forwardRef((props, ref) => {
  return (
    <S.FormGroup>
      <S.FormLabel>{props.label}</S.FormLabel>

      <S.FormInput 
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        ref={ref}
        autoComplete='off'
      />

      <S.InputError>{props.error}</S.InputError>
    </S.FormGroup>
  )
})

export default FormGroup