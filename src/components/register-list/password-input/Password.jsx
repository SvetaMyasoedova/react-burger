
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import stylesPassword from './password.module.css'

export const Password = ({placeholder, onChange, value, icon}) => {

	
  return (
    <div className={stylesPassword.main}>
      <PasswordInput
        onChange={onChange}
        value={value}
        icon={icon}
        name={'password'}
        extraClass="mb-2"
        placeholder={placeholder}
      />
      
    </div>
  )
}