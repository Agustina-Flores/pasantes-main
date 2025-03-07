import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import InputGroup from 'react-bootstrap/InputGroup';

interface Props {
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Contraseña: React.FC<Props> = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (


    <Form.Group as={Col} controlId="formGridContraseña"> 
      <Form.Label>Contraseña<span className="obligatorio">*</span></Form.Label>
      <div className="inputContraseña">
      <InputGroup className="mb-3">
      <Form.Control className="input"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          name= "contrasenia"
          value={value}
          onChange={onChange}  
          required
        />
        <Button  className="input" variant="primary" onClick={togglePasswordVisibility}>
          {showPassword ? <BsEyeSlash /> : <BsEye />}
        </Button>
      </InputGroup>
      </div>
    </Form.Group>
  );
};

export default Contraseña;
