import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Contraseña from "../../components/contraseña";
import PaisSelect from "../../components/paises";
import Select from "react-select";
import FotoEmpresa from "../../components/fotoEmpresa";
import { FaTrash } from "react-icons/fa";
import StylesListaColaboradores from "../../styles/listaColaboradores.module.css";
import Header from "../../layout/header";

const options = [
  { value: "inscripto", label: "Responsable Inscripto" },
  { value: "monotribustista", label: "Monotribustista" },
];

// const optionsEducacion = [
//   { value: "terminada", label: "Terminada" },
//   { value: "cursando", label: "Cursando" },
//   { value: "incompleta", label: "Incompleta" },
// ];

const FormEmpresa = () => {
  // const [educations, setEducations] = useState([{ id: Date.now() }]);
  const [cont, setcont] = useState([{ id: Date.now() }]);
  // const [courses, setCourses] = useState([{ id: Date.now() }]); // Nuevo estado para cursos

  // const handleAddEducation = () => {
  //   setEducations([...educations, { id: Date.now() }]);
  // };

  // const handleRemoveEducation = (id: number) => {
  //   setEducations(educations.filter((edu) => edu.id !== id));
  // };

  const handleAddExperience = () => {
    setcont([...cont, { id: Date.now() }]);
  };

  const handleRemoveCont = (id: number) => {
    setcont(cont.filter((cont) => cont.id !== id));
  };

  // const handleAddCourse = () => {
  //   // Función para agregar cursos
  //   setCourses([...courses, { id: Date.now() }]);
  // };

  // const handleRemoveCourse = (id: number) => {
  //   // Función para eliminar cursos
  //   setCourses(courses.filter((course) => course.id !== id));
  // };
  const [foto, setFoto] = useState<File | null>(null);
  console.log(foto);
  const manejarArchivo = (nuevoArchivo: File) => {
    if (nuevoArchivo) {
      setFoto(nuevoArchivo);
    } else {
      setFoto(null);
    }
  };
  return (
    <div className={`${StylesListaColaboradores.contenedorListas}`}>
      <Header/>
      <Form className="contenedor">
        <h1 className="titulo">Inscripción para empresa</h1>
        <br />
        <FotoEmpresa onChangeFoto={manejarArchivo} />
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCuit">
            <Form.Label>
              Cuit<span className="obligatorio">*</span>
            </Form.Label>
            <Form.Control
              className="input"
              type="number"
              placeholder="Número de Cuit"
              required
            />
          </Form.Group>
          <Contraseña />
        </Row>
        <Form.Group className="mb-3" as={Col} controlId="formGridEmail">
          <Form.Label>
            Email<span className="obligatorio">*</span>
          </Form.Label>
          <Form.Control
            className="input"
            type="email"
            placeholder="email@gmail.com"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridLinkedin">
          <Form.Label>URL de perfil de Linkedin</Form.Label>
          <Form.Control className="input" placeholder="Perfil de Linkedin" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridMonotributo">
            <Form.Label>
              Razón social<span className="obligatorio">*</span>
            </Form.Label>
            <Form.Control className="input" placeholder="Razón social" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCelular">
            <Form.Label>Nombre de Fantasia</Form.Label>
            <Form.Control className="input" placeholder="Nombre de Fantasia" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCondicionIVA">
            <Form.Label>
              Condición frente al IVA<span className="obligatorio">*</span>
            </Form.Label>
            <Select
              className="input"
              options={options}
              placeholder="Seleccione"
              required
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formGridApellido">
            <Form.Label>Telefono fijo</Form.Label>
            <Form.Control
              className="input"
              type="number"
              placeholder="Característica + Número"
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formGridExperienciaLaboral">
          {cont.map((cont) => (
            <Row className="mb-3" key={cont.id}>
              <h2 className="mb-3">Información de Contacto</h2>
              <Form.Group
                className="mb-3"
                controlId={`formGridCargo${cont.id}`}
              >
                <Form.Label>Cargo</Form.Label>
                <Form.Control className="input" placeholder="Cargo" />
              </Form.Group>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId={`formGridNombre${cont.id}`}
              >
                <Form.Label>Nombre</Form.Label>
                <Form.Control className="input" placeholder="Nombre" />
              </Form.Group>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId={`formGridApellido${cont.id}`}
              >
                <Form.Label>Apellido</Form.Label>
                <Form.Control className="input" placeholder="Apellido" />
              </Form.Group>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId={`formGridApellido${cont.id}`}
              >
                <Form.Label>Celular</Form.Label>
                <Form.Control
                  className="input"
                  type="number"
                  placeholder="Característica + Número"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId={`formGridEmail${cont.id}`}
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="input"
                  type="email"
                  placeholder="email@gmail.com"
                />
              </Form.Group>
              <Button
                className="botonEliminar"
                variant="danger"
                onClick={() => handleRemoveCont(cont.id)}
              >
                <FaTrash />
              </Button>
            </Row>
          ))}
          <Button variant="primary" onClick={handleAddExperience}>
            Agregar Contacto
          </Button>
        </Form.Group>
        {/* <Form.Group className="" controlId="formGridEstudios">
        {educations.map((edu) => (
          <Row className="mb-3" key={edu.id}>
            <h2 className="mb-3">Formación academica</h2>
            <Form.Group
              className="mb-3"
              controlId={`formGridEducacionInstitucion${edu.id}`}
            >
              <Form.Label>Institución educativa</Form.Label>
              <Form.Control className="input" placeholder="Educación" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId={`formGridEducacionTitulo${edu.id}`}
            >
              <div className="contenedorInputCompartido">
                <div>
                  <Form.Label>Título</Form.Label>
                  <Form.Control className="input" placeholder="Título" />
                </div>
                <div>
                  <Form.Label>Condición de cursado</Form.Label>
                  <Select
                    className="input"
                    options={optionsEducacion}
                    placeholder="Seleccione"
                    styles={customStyles}
                  />
                </div>
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId={`formGridEducacionContenido${edu.id}`}
            >
              <Form.Label>Detalle el contenido aprendido</Form.Label>
              <Form.Control
                className="input"
                as="textarea"
                rows={5}
                placeholder="Desarrolla lo más relevante desde tu punto de vista de los que has aprendido"
              />
            </Form.Group>
            <Button
              className="botonEliminar"
              variant="danger"
              onClick={() => handleRemoveEducation(edu.id)}
            >
              <FaTrash />
            </Button>
          </Row>
        ))}
        <Button className="mb-3" variant="primary" onClick={handleAddEducation}>
          Agregar Educación
        </Button>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridcursos">
        {courses.map((course) => (
          <Row className="mb-3" key={course.id}>
            <h2 className="mb-3">Formación adicional</h2>
            <Form.Group
              className="mb-3"
              controlId={`formGridCursoNombre${course.id}`}
            >
              <Form.Label>Nombre del curso</Form.Label>
              <Form.Control className="input" placeholder="Nombre del curso" />
            </Form.Group>
            <div className="contenedorInputCompartido">
              <div>
                <Form.Label>Institución que lo dicta</Form.Label>
                <Form.Control
                  className="input mb-3"
                  placeholder="Detalle el nombre completo"
                />
              </div>
              <div>
                <Form.Label>Carga horarias</Form.Label>
                <Form.Control
                  className="input mb-3"
                  type="number"
                  placeholder="Cantidad de hs"
                />
              </div>
            </div>
            <Form.Group
              className="mb-3"
              controlId={`formGridCursoContenido${course.id}`}
            >
              <Form.Label>Contenido del curso</Form.Label>
              <Form.Control
                className="input mb-3"
                as="textarea"
                rows={5}
                placeholder="Descripción del contenido del curso"
              />
            </Form.Group>
            <Button
              className="botonEliminar"
              variant="danger"
              onClick={() => handleRemoveCourse(course.id)}
            >
              <FaTrash />
            </Button>
          </Row>
        ))}
        <Button variant="primary" onClick={handleAddCourse}>
          Agregar Curso
        </Button>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridConocimientos">
        <Form.Label>Otros conocimientos</Form.Label>
        <Form.Control
          className="input"
          as="textarea"
          rows={5}
          placeholder="Detalla conocimientos incorporados a través de forma autodidacta"
        />
      </Form.Group> */}
        <Form.Group className="mb-3" controlId="formGridPresentacion">
          <Form.Label>
            Presentación<span className="obligatorio">*</span>
          </Form.Label>
          <Form.Control
            className="input"
            as="textarea"
            rows={8}
            placeholder="Esta sección aparecerá encabezando tu presentación para las empresas"
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <PaisSelect />
          <Form.Group as={Col} controlId="formGridProvincia">
            <Form.Label>Provincia</Form.Label>
            <Form.Control className="input" placeholder="Provincia/Estado" />
          </Form.Group>
        </Row>
        <Form.Group as={Col} controlId="formGridDomicilio">
          <Form.Label>Domicilio</Form.Label>
          <Form.Control className="mb-3 input" placeholder="Domicilio" />
        </Form.Group>
        {/* <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridProvincia">
          <Form.Label>
            Tarifa por hora<span className="obligatorio">*</span>
          </Form.Label>
          <Form.Control
            type="number"
            className="mb-3 input"
            placeholder="Monto en pesos"
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridProvincia">
          <Form.Label>
            Disponibilidad horaria<span className="obligatorio">*</span>
          </Form.Label>
          <Form.Control
            className="input"
            placeholder="Detalle la disponibilidad"
            required
          />
        </Form.Group>
      </Row> */}
        {/* <Form.Group as={Col}>
        <Form.Label>Adjuntar CV</Form.Label>
        <Form.Control type="file" />
      </Form.Group> */}
        <Form.Group as={Col} className="mb-3" id="formGridCheckbox">
          <a href="">
            <Form.Check
              className="politica"
              type="checkbox"
              label="Acepto las políticas de uso y privacidad"
            />
          </a>
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </div>
  );
};

export default FormEmpresa;
