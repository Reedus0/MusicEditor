import React from 'react'
import Input from '../../Input/Input'
import ButtonPrompt from '../../Prompt/ButtonPrompt/ButtonPrompt'



export default function FormLogin() {

  function loginRequest(event: any) {
    event.preventDefault()
  }

  return (
    <form className='form-auth' id="form-login" onSubmit={(e: any) => loginRequest(e)}>
      <Input name="username" type="text" placeholder='Username' autoComplete='off' />
      <Input name="password" type="password" placeholder="Password" autoComplete='off' />
      <div className='buttons-prompt'>
        <ButtonPrompt name="Login" function={(e: any) => loginRequest(e)} />
      </div>
    </form>
  )
}
