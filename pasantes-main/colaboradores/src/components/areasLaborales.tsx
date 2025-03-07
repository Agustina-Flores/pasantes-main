import  Select , { MultiValue }  from "react-select";
import { Form, Col } from "react-bootstrap";

const options = [
  { value: "marketing", label: "Marketing" },
  { value: "recursos_humanos", label: "Recursos Humanos" },
  { value: "finanzas", label: "Finanzas" },
  { value: "ventas", label: "Ventas" },
  {
    value: "tecnologia_informacion",
    label: "Tecnología de la Información (IT)",
  },
  { value: "industria", label: "Industria" },
  { value: "diseno", label: "Diseño" },
  { value: "educacion", label: "Educación" },
  { value: "salud", label: "Salud" },
  { value: "social media", label: "Social Media" },
];

interface AreaLaboral {
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
const AreasLaborales: React.FC<AreaLaboral> = ({ handleChange }) => {
  return (
    <Form.Group as={Col} controlId="formGridAreaLaboral">
      <Form.Label>Area de Interes</Form.Label>
      <Select
        className="input"
        options={options}
        placeholder="Seleccione tu area de interes"
        styles={customStyles}
        isMulti={true}
        name="area"  
        onChange={(selected) => handleChange(selected, "area")}
      />
    </Form.Group>
  );
};

export default AreasLaborales;
