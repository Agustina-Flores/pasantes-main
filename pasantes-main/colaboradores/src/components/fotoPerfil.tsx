import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import StylesFotoPerfil from "../styles/fotoPerfil.module.css";
import SinFoto from "../images/noprofil.png";
import { FC } from "react";

interface Props {
  onChangeFoto: (foto: File| null) => void;
}

const FotoPerfil: FC<Props> = ({ onChangeFoto }) => {
  
  const [imgSrc, setImgSrc] = useState(SinFoto); 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImgSrc(e.target.result as string); 
        }
      };
      reader.onerror = () => {
        console.error("Error al leer el archivo");
      };
  
      reader.readAsDataURL(file);

        if (onChangeFoto) {
          onChangeFoto(file);
        }
      } else {  
        setImgSrc(SinFoto);
        
        if (onChangeFoto) {
          onChangeFoto(null);
        }
      }
  };

  return (
    <Form.Group as={Col} controlId="formGridEspecialidad">
      <div id="datosfoto">
        <div className={`mb-3 ${StylesFotoPerfil.upload}`}>
          <label htmlFor="file">
            <img src={imgSrc || "public/descargas/profile.jpg"} width={100} height={100} alt="Foto de perfil" />
          </label>
          <div className={StylesFotoPerfil.round}>
            <input
              id="file"
              type="file"
              accept="image/*"
              name="inpGetFileArchivo"
              onChange={handleFileChange}
              title="Adjuntar foto"
              style={{ display: 'none' }}
            />
            <FaCamera className={StylesFotoPerfil.facamera} />
          </div>
        </div>
      </div>
    </Form.Group>
  );
};

export default FotoPerfil;