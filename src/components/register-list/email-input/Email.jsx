import { useState} from "react";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

export const Email = () => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <EmailInput
        onChange={onChange}
        value={value}
        name={"email"}
        isIcon={false}
      />
    </div>
  );
};
