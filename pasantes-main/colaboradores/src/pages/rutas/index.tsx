import { Link } from 'react-router-dom';

const Rutas = () => {
  return (
    <section>
      <h1 className="titulo">Rutas</h1>
      <h2><Link to="/formColaborador">formColaborador</Link></h2>
      <h2><Link to="/formEmpresa">formEmpresa</Link></h2>

    </section>
  );
};

export default Rutas;