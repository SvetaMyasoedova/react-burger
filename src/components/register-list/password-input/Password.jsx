import { useState} from "react";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import stylesPassword from './password.module.css'

export const Password = () => {

	const [value, setValue] = useState('')
  const onChange = e => {
    setValue(e.target.value)
  }
  return (
    <div className={stylesPassword.main}>
      <PasswordInput
        onChange={onChange}
        value={value}
        name={'password'}
        extraClass="mb-2"
      />
      
    </div>
  )
}