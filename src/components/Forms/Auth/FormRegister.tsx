import React from 'react'
import Input from '../../Input/Input'
import ButtonPrompt from '../../Prompt/ButtonPrompt/ButtonPrompt'



export default function FormRegister() {

  function registerRequest(event: any) {
    event.preventDefault()
  }
  
  return (
      <form className='form-auth' id="form-login" onSubmit={(e: any) => registerRequest(e)}>
        <Input name="username" type="text" placeholder="Username" autoComplete='off' />
        <Input name="email" type="email" placeholder="E-mail" autoComplete='off' />
        <Input name="passwordFirst" type="password" placeholder="Password" autoComplete='off' />
        <Input name="passwordSecond" type="password" placeholder="Password again" autoComplete='off' />
        <div className='buttons-prompt'>
          <ButtonPrompt name="Register" function={(e: any) => registerRequest(e)} />
        </div>
      </form>
  )
}
