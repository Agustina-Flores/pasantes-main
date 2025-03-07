import Select , { MultiValue } from "react-select";
import { Form, Col } from "react-bootstrap";

const options = [
  { value: "chinese", label: "Chino" },
  { value: "spanish", label: "Español" },
  { value: "english", label: "Inglés" },
  { value: "hindi", label: "Hindi" },
  { value: "arabic", label: "Árabe" },
  { value: "portuguese", label: "Portugués" },
  { value: "bengali", label: "Bengalí" },
  { value: "russian", label: "Ruso" },
  { value: "japanese", label: "Japonés" },
  { value: "punjabi", label: "Punjabí" },
  { value: "german", label: "Alemán" },
  { value: "french", label: "Francés" },
  { value: "indonesian", label: "Indonesio" },
  { value: "urdu", label: "Urdu" },
  { value: "swahili", label: "Suajili" },
  { value: "marathi", label: "Maratí" },
  { value: "telugu", label: "Telugu" },
  { value: "turkish", label: "Turco" },
  { value: "italian", label: "Italiano" },
  { value: "thai", label: "Tailandés" }
];

interface Idiomas {
  handleChange: (
    e: MultiValue<{ value: string; label: string }>,
    field: string
  ) => void;
}


const customStyles = {
  option: (provided: any) => ({
    ...provided,
    color: 'black', // Cambia el color de las opciones
  }),
  control: (provided: any) => ({
    ...provided,
    width: "100%",
  }),
};
  const AreasLaborales: React.FC<Idiomas> = ({ handleChange }) => {
  return (
    <Form.Group as={Col} controlId="formGridIdiomas">
      <Form.Label>Idiomas<span className="obligatorio">*</span></Form.Label>
      <Select className="input"
        options={options}
        placeholder="Seleccione un Idioma"
        styles={customStyles}
        isMulti={true}
        name="idioma"  
        onChange={(selected) => handleChange(selected, "idioma")}
        required
      />
    </Form.Group>
  );
};

export default AreasLaborales ;
