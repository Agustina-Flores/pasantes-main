import { useState,FormEvent  } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Contraseña from "../../components/contraseña";
import PaisSelect from "../../components/paises";
import AreasLaborales from "../../components/areasLaborales";
import Idiomas from "../../components/idiomas";
import Select , { SingleValue,MultiValue }from "react-select";
import FotoPerfil from "../../components/fotoPerfil";
import { FaTrash } from "react-icons/fa";
import Header from "../../layout/header";
import StylesListaColaboradores from "../../styles/listaColaboradores.module.css"; 

const customStyles = {
  option: (provided: any) => ({
    ...provided,
    color: "black", 
  }),
  control: (provided: any) => ({
    ...provided,
    color: "black",
  }),
};

const options = [
  { value: "inscripto", label: "Responsable Inscripto" },
  { value: "monotribustista", label: "Monotribustista" },
];

const optionsEducacion = [
  { value: "terminada", label: "Terminada" },
  { value: "cursando", label: "Cursando" },
  { value: "incompleta", label: "Incompleta" },
];

const optionsExperiencia = [
  { value: "fulltime", label: "Full-time" },
  { value: "parttime", label: "Part-time" },
  { value: "freelancer", label: "Freelancer" },
];

const FormColaborador = () => {

  interface FormDataState {
    dni: string;
    contrasenia: string;
    email: string;
    nombre: string;
    apellido: string;
    celular: string;
    linkedin: string;
    razonSocial: string;
    condicionIVA: string;
    cuit: string;
    fotoPerfil: File | null;
    experienciaLaboral: { id: number; cargo: string; empresa: string; jornada: string; tiempo: string; detalle: string; sigoTrabajando: boolean }[];
    educacion: { id: number; institucion: string; titulo: string; cursado: string; detalles: string }[];
    cursos: { id: number; nombre: string; institucion: string; carga: string; contenido: string }[];
    conocimientos: string;
    presentacion: string;
    idioma: [] ; 
    area: [] ; 
    pais: [] ; 
    provincia: string;
    domicilio: string;
    tarifaHora: string;
    disponibilidad: string;
    cv: File | null;
    aceptarPoliticas: boolean;
  }

  const [formData, setFormData] = useState<FormDataState>({  
    dni: "",
    contrasenia:"",  
    email: "",
    nombre: "",
    apellido: "",
    celular: "",
    linkedin: "",
    razonSocial: "",
    condicionIVA: "",
    cuit: "",
    fotoPerfil: null as File | null,
    experienciaLaboral: [{ 
      id: Date.now(),
      cargo: '', 
      empresa: '', 
      jornada: '', 
      tiempo: '', 
      detalle: '', 
      sigoTrabajando : false, 
      }],
      educacion: [{ 
        id: Date.now(),
        institucion: '', 
        titulo: '', 
        cursado: '', 
        detalles: '', 
        }],
      cursos: [{ 
        id: Date.now(),
        nombre: '', 
        institucion: '', 
        carga: '', 
        contenido: '', 
        }],
        conocimientos: '', 
        presentacion: '', 
        idioma: [],
        area: [],
        pais: [],
        provincia: '',
        domicilio: '',
        tarifaHora: '',
        disponibilidad: '',
        aceptarPoliticas: false,
        cv: null as File | null,

  });


  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | SingleValue<{ value: string; label: string }>
      | MultiValue<{ value: string; label: string }>, 
    field: string,
    id?: number, 
    section?: "experienciaLaboral" | "educacion" | "cursos" | "idioma" | "area" | "pais"
  ) => {
    if (!e) return;
  
    let value: string | number | string[] | File;
  
    if ("target" in e) {
      const target = e.target;
      
      if (target instanceof HTMLInputElement) {
        if (target.type === "checkbox") {
          value = target.checked ? 1 : 0;
        } else if (target.type === "file" && target.files?.length) {
          value = target.files[0]; 
        } else {
          value = target.value;
        }
      } else {
        value = target.value;
      }
    } else if (Array.isArray(e)) {
      value = e.map((option) => option.value);
    } else if (e && "value" in e) {
      value = e.value;
    } else {
      return;
    }
  
    setFormData((prevData) => {
      if (section && id !== undefined) {
        return {
          ...prevData,
          [section]: prevData[section].map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          ),
        };
      }
  
      return {
        ...prevData,
        [field]: value,
      };
    });
  };
  const handleAddExperience = () => {
    setFormData((prevState) => ({
      ...prevState,
      experienciaLaboral: [
        ...prevState.experienciaLaboral,
        { 
          id: Date.now(),
          cargo: "", 
          empresa: "", 
          jornada: "", 
          tiempo: "", 
          detalle: "", 
          sigoTrabajando: false 
        },
      ],
    }));
  };

  const handleRemoveExperience = (id: number) => {
    setFormData((prevState) => ({
      ...prevState,
      experienciaLaboral: prevState.experienciaLaboral.filter((exp) => exp.id !== id),
    }));
  };
  const handleAddEducation = () => {
    setFormData((prevState) => ({
      ...prevState,
      educacion: [
        ...prevState.educacion,
        { id: Date.now(), 
          institucion: "", 
          titulo: "", 
          cursado: "", 
          detalles: "" 
        },
      ],
    }));
  };

  const handleRemoveEducation = (id: number) => {
    setFormData((prevState) => ({
      ...prevState,
      educacion: prevState.educacion.filter((edu) => edu.id !== id),
    }));
  };
 
  const manejarArchivo = (nuevoArchivo: File | null) => {
    setFormData((prevData) => ({ ...prevData, fotoPerfil: nuevoArchivo }));
  };

  const handleAddCourse = () => {
    setFormData((prevState) => ({
      ...prevState,
      cursos: [
        ...prevState.cursos,
        { id: Date.now(), 
          nombre: "", 
          institucion: "", 
          carga: "", 
          contenido: "" 
        },
      ],
    }));
  };

  const handleRemoveCourse = (id: number) => {
    setFormData((prevState) => ({
      ...prevState,
      cursos: prevState.cursos.filter((course) => course.id !== id),
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  const formDataToSend = new FormData();

  formDataToSend.append("dni", formData.dni);
  formDataToSend.append("contrasenia", formData.contrasenia);
  formDataToSend.append("email", formData.email);
  formDataToSend.append("nombre", formData.nombre);
  formDataToSend.append("apellido", formData.apellido);
  formDataToSend.append("celular", formData.celular);
  formDataToSend.append("linkedin", formData.linkedin);
  formDataToSend.append("razonSocial", formData.razonSocial);
  formDataToSend.append("condicionIVA", formData.condicionIVA);
  formDataToSend.append("cuit", formData.cuit);
  formDataToSend.append("conocimientos", formData.conocimientos);
  formDataToSend.append("presentacion", formData.presentacion);
  formDataToSend.append("provincia", formData.provincia);
  formDataToSend.append("domicilio", formData.domicilio);
  formDataToSend.append("tarifaHora", formData.tarifaHora);
  formDataToSend.append("disponibilidad", formData.disponibilidad);
   
  if (formData.cv instanceof File) {
    formDataToSend.append("cv", formData.cv);
  } 
 
  if (formData.fotoPerfil instanceof File) {
    formDataToSend.append("fotoPerfil", formData.fotoPerfil);
  }  
  if (formData.experienciaLaboral.length > 0) {
    formDataToSend.append("experienciaLaboral", JSON.stringify(formData.experienciaLaboral));
  }

  if (formData.educacion.length > 0) {
    formDataToSend.append("educacion", JSON.stringify(formData.educacion));
  }
  
  if (formData.cursos.length > 0) {
    formDataToSend.append("cursos", JSON.stringify(formData.cursos));
  } 
  if (formData.idioma.length > 0) {
    formDataToSend.append("idioma", formData.idioma.join(","));
  }
  if (formData.area.length > 0) {
    formDataToSend.append("area", formData.area.join(","));
  }
  if (formData.pais.length > 0) {
    formDataToSend.append("pais", formData.pais.join(","));
  } 
  formDataToSend.append("aceptarPoliticas", formData.aceptarPoliticas ? "1" : "0");
  
  try {
    const response = await fetch("http://localhost:8000/formColaborador.php", {
      method: "POST", 
      body: formDataToSend,
    });
   
    const text = await response.text(); 
  
    console.log("🔍 Respuesta :", text);
  
    const result = JSON.parse(text);
    if (response.ok) {
      console.log("Datos enviados con éxito:", result);
    } else {
      console.error("Error en la respuesta del servidor:", result);
    }
  } catch (error) {
    console.error("Error al enviar los datos:", error);
  }
  };

  return (
    <div className={`${StylesListaColaboradores.contenedorListas}`}>
      <Header />  
    <Form className="contenedor" onSubmit={handleSubmit}>
      <h1 className="titulo">Inscripción para colaborador</h1>
      <br />
      <FotoPerfil  onChangeFoto={manejarArchivo} />
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCelular">
          <Form.Label>D.N.I.<span className="obligatorio">*</span></Form.Label>
          <Form.Control
             className="input"
             name="dni"
             value={formData.dni} 
             type="text"
             placeholder="D.N.I."
             onChange={(e) => handleChange(e, "dni")} 
             required
          />
        </Form.Group>
        <Contraseña value={formData.contrasenia} onChange={(e) => handleChange(e, "contrasenia")}  />
        </Row>
        <Form.Group className="mb-3" as={Col} controlId="formGridEmail">
        <Form.Label>Email<span className="obligatorio">*</span></Form.Label>
        <Form.Control
          className="input"
          name="email"
          value={formData.email} 
          type="email"
          placeholder="email@gmail.com"
          onChange={(e) => handleChange(e, "email")}  
          required
        />
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridNombre">
          <Form.Label>Nombre<span className="obligatorio">*</span></Form.Label>
          <Form.Control className="input" name="nombre" value={formData.nombre}  onChange={(e) => handleChange(e, "nombre")}   placeholder="Nombre" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridApellido">
          <Form.Label>Apellido<span className="obligatorio">*</span></Form.Label>
          <Form.Control className="input" name="apellido" value={formData.apellido} onChange={(e) => handleChange(e, "apellido")}    placeholder="Apellido" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCelular">
          <Form.Label>Celular<span className="obligatorio">*</span></Form.Label>
          <Form.Control
            className="input"
            type="number"
            name="celular"
            value={formData.celular} 
            placeholder="Característica + Número"
            onChange={(e) => handleChange(e, "celular")}  
            required
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formGridLinkedin">
        <Form.Label>URL de perfil de Linkedin</Form.Label>
        <Form.Control className="input" name="linkedin" value={formData.linkedin} onChange={(e) => handleChange(e, "linkedin")}   placeholder="Perfil de Linkedin" />
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridMonotributo">
          <Form.Label>Razón social<span className="obligatorio">*</span></Form.Label>
          <Form.Control className="input" name="razonSocial" value={formData.razonSocial} onChange={(e) => handleChange(e, "razonSocial")} placeholder="Razón social" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCondicionIVA">
          <Form.Label>Condición frente al IVA<span className="obligatorio">*</span></Form.Label>
          <Select
            className="input"
            options={options}
            name="condicionIVA" 
            value={options.find(option => option.value === formData.condicionIVA) || null}
            onChange={(selectedOption) => handleChange(selectedOption, "condicionIVA")}
            placeholder="Seleccione"
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCuit">
          <Form.Label>Cuit<span className="obligatorio">*</span></Form.Label>
          <Form.Control
            className="input"
            type="number"
             name="cuit"
             value={formData.cuit} 
            placeholder="Número de Cuit"
            onChange={(e) => handleChange(e, "cuit")}
            required
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formGridExperienciaLaboral"> 
      {formData.experienciaLaboral.map((exp) => (
          <Row className="mb-3" key={exp.id}>
            <h2 className="mb-3">Experiencia laboral</h2>
            <Form.Group className="mb-3" controlId={`formGridCargo${exp.id}`}>
              <Form.Label>Cargo</Form.Label>
              <Form.Control className="input" name="cargo" value={exp.cargo} onChange={(e) => handleChange(e,"cargo", exp.id, "experienciaLaboral")} placeholder="Cargo" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId={`formGridExperienciaEmpresa${exp.id}`}
            >
              <Form.Label>Nombre de la empresa</Form.Label>
              <Form.Control
                className="input"
                name="empresa"
                value={exp.empresa}
                onChange={(e) => handleChange(e, "empresa",exp.id, "experienciaLaboral")} 
                placeholder="Nombre de la empresa"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId={`formGridExperienciaCondicion${exp.id}`}
            >
              <div className="contenedorInputCompartido">
                <div>
                  <Form.Label>Jornada laboral</Form.Label>
                  <Select
                    className="input"
                    options={optionsExperiencia}
                    name="jornada" 
                    placeholder="Seleccione"
                    value={optionsExperiencia.find(option => option.value === exp.jornada) || null}
                    onChange={(selectedOption) => 
                      handleChange(selectedOption as SingleValue<{ value: string; label: string }>, "jornada", exp.id, "experienciaLaboral")
                    }
                    styles={customStyles}
                  />
                </div>
                <div>
                  <Form.Label>Tiempo de experiencia</Form.Label>
                  <Form.Control
                    className="input"
                    name="tiempo"
                    value={exp.tiempo}
                    onChange={(e) => handleChange(e,"tiempo",exp.id, "experienciaLaboral")} 
                    placeholder="Detalle años y meses"
                  />
                </div>
              </div>
            </Form.Group>
            <Form.Group
              className=""
              controlId={`formGridExperienciaTareas${exp.id}`}
            >
              <Form.Label>Detalle las tareas realizadas</Form.Label>
              <Form.Control
                className="input"
                placeholder="Detalle las tareas realizadas"
                as="textarea"
                name="detalle"
                value={exp.detalle}
                onChange={(e) => handleChange(e,"detalle",exp.id, "experienciaLaboral")} 
                rows={5}
              />
            </Form.Group>
            <Form.Group className="" id="formGridCheckbox">
              <Form.Check
                className="politica"
                type="checkbox"
                checked={!!exp.sigoTrabajando} 
                  onChange={(e) => handleChange(e, "sigoTrabajando", exp.id, "experienciaLaboral")}
                label="Actualmente trabajo aquí"
              />
            </Form.Group>
            <Button
              className="botonEliminar"
              variant="danger"
              onClick={() => handleRemoveExperience(exp.id)}
            >
              <FaTrash />
            </Button>
          </Row>
        ))}
         <Button variant="primary" onClick={handleAddExperience}>
          Agregar Experiencia
        </Button>
      </Form.Group > 
      <Form.Group className="" controlId="formGridEstudios">
      {formData.educacion.map((edu) => (
          <Row className="mb-3" key={edu.id}>
            <h2 className="mb-3">Formación academica</h2>
            <Form.Group
              className="mb-3"
              controlId={`formGridEducacionInstitucion${edu.id}`}
            >
              <Form.Label>Institución educativa</Form.Label>
              <Form.Control 
              className="input" 
              name="institucion" 
              value={edu.institucion} 
              onChange={(e) => handleChange(e, "institucion", edu.id, "educacion")}  
              placeholder="Educación" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId={`formGridEducacionTitulo${edu.id}`}
            >
              <div className="contenedorInputCompartido">
                <div>
                  <Form.Label>Título</Form.Label>
                  <Form.Control className="input" name="titulo" value={edu.titulo} onChange={(e) => handleChange(e,"titulo", edu.id, "educacion")}placeholder="Título" />
                </div>
                <div>
                  <Form.Label>Condición de cursado</Form.Label>
                  <Select
                    className="input"
                    options={optionsEducacion}
                    name="cursado"
                    value={optionsEducacion.find(option => option.value === edu.cursado) || null}
                    onChange={(selectedOption) => 
                      handleChange(selectedOption as SingleValue<{ value: string; label: string }>, "cursado", edu.id, "educacion")
                    }
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
                name="detalles"
                value={edu.detalles} 
                onChange={(e) => handleChange(e,"detalles", edu.id, "educacion")}
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
      {formData.cursos.map((curso) => (
          <Row className="mb-3" key={curso.id}>
            <h2 className="mb-3">Formación adicional</h2>
            <Form.Group
              className="mb-3"
              controlId={`formGridCursoNombre${curso.id}`}
            >
              <Form.Label>Nombre del curso</Form.Label>
              <Form.Control className="input" name="nombre" value={curso.nombre} onChange={(e) => handleChange(e,"nombre", curso.id, "cursos")} placeholder="Nombre del curso" />
            </Form.Group>
            <div className="contenedorInputCompartido">
              <div>
                <Form.Label>Institución que lo dicta</Form.Label>
                <Form.Control
                  className="input mb-3"
                  placeholder="Detalle el nombre completo"
                  name="institucion" 
                  value={curso.institucion}
                  onChange={(e) => handleChange(e,"institucion", curso.id, "cursos")}
                />
              </div>
              <div>
                <Form.Label>Carga horarias</Form.Label>
                <Form.Control
                  className="input mb-3"
                  type="number"
                  placeholder="Cantidad de hs"
                  name="carga" 
                  value={curso.carga} 
                  onChange={(e) => handleChange(e,"carga", curso.id, "cursos")}
                />
              </div>
            </div>
            <Form.Group
              className="mb-3"
              controlId={`formGridCursoContenido${curso.id}`}
            >
              <Form.Label>Contenido del curso</Form.Label>
              <Form.Control
                className="input mb-3"
                as="textarea"
                rows={5}
                name="contenido" 
                value={curso.contenido} 
                onChange={(e) => handleChange(e,"contenido", curso.id, "cursos")}
                placeholder="Descripción del contenido del curso"
              />
            </Form.Group>
            <Button
              className="botonEliminar"
              variant="danger"
              onClick={() => handleRemoveCourse(curso.id)}
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
          name="conocimientos" 
          value={formData.conocimientos} 
          onChange={(e) => handleChange(e, "conocimientos")} 
          placeholder="Detalla conocimientos incorporados a través de forma autodidacta"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridPresentacion">
        <Form.Label>Presentación<span className="obligatorio">*</span></Form.Label>
        <Form.Control
          className="input"
          as="textarea"
          rows={8}
          name="presentacion" 
          value={formData.presentacion} 
          onChange={(e) => handleChange(e, "presentacion")} 
          placeholder="Esta sección aparecerá encabezando tu presentación para las empresas"
          required
        />
      </Form.Group>
      <Row className="mb-3">
        <Idiomas handleChange={handleChange}/>
        <AreasLaborales handleChange={handleChange} />
      </Row>
      <Row className="mb-3">
        <PaisSelect handleChange={handleChange} />
        <Form.Group as={Col} controlId="formGridProvincia">
          <Form.Label>Provincia</Form.Label>
          <Form.Control className="input"  name="provincia" value={formData.provincia} onChange={(e) => handleChange(e, "provincia")}  placeholder="Provincia/Estado" />
        </Form.Group>
      </Row>
      <Form.Group as={Col} controlId="formGridDomicilio">
        <Form.Label>Domicilio</Form.Label>
        <Form.Control className="mb-3 input"  name="domicilio" value={formData.domicilio} onChange={(e) => handleChange(e, "domicilio")}  placeholder="Domicilio" />
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridProvincia">
          <Form.Label>Tarifa por hora<span className="obligatorio">*</span></Form.Label>
          <Form.Control
            type="number"
            className="mb-3 input"
            placeholder="Monto en pesos"
            name="tarifaHora"
            value={formData.tarifaHora} 
            onChange={(e) => handleChange(e, "tarifaHora")}
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridProvincia">
          <Form.Label>Disponibilidad horaria<span className="obligatorio">*</span></Form.Label>
          <Form.Control
            className="input"
            placeholder="Detalle la disponibilidad"
            name="disponibilidad"
            value={formData.disponibilidad} 
            onChange={(e) => handleChange(e, "disponibilidad")} 
            required
          />
        </Form.Group>
      </Row>
      <Form.Group as={Col}>
        <Form.Label>Adjuntar CV</Form.Label>
        <Form.Control type="file" name="cv" onChange={(e) => handleChange(e, "cv")}  />
      </Form.Group>
      <Form.Group as={Col} className="mb-3" id="formGridCheckbox">
        <a href="">
          {" "}
          <Form.Check
            className="politica"
            type="checkbox" 
            checked={!!formData.aceptarPoliticas}
            onChange={(e) => handleChange(e, "aceptarPoliticas")} 
            label="Acepto las políticas de uso y privacidad"
          />
        </a>
      </Form.Group >
      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
    </div>

  );
};

export default FormColaborador;