    import StylesHeader from "../styles/header.module.css";

    function Header() {
    return (
        <header className={StylesHeader.header}>
        <div
            className={`${StylesHeader.container} ${StylesHeader.logoNavContainer}`}
        >
            <a className={StylesHeader.logo}> </a>
            {/*lista desplegable de Menu*/}
            <div className={StylesHeader.menuacordeon}>
            <div className={StylesHeader.menuacordeon__item}>
                <input type="checkbox" name="acordeon" className={StylesHeader.menuitem1} id="menuitem1" />
                <label
                htmlFor="menuitem1"
                className={StylesHeader.menuacordeon__titulo}
                >
                <span className={StylesHeader.menu}>
                    <menu className={StylesHeader.iconoMenu} id="">
                    <img src="./src/imgColaboradores/iconomenu.webp" />
                    </menu>
                </span>
                </label>
                <ul className={StylesHeader.menuacordeon__contenido}>
                <input type="checkbox" />
                <label
                    htmlFor="menuitem1"
                    className={StylesHeader.menuacordeon__titulo}
                >
                    <img
                    className={StylesHeader.iconoCruz} id=""
                    src="./src/imgColaboradores/iconoCruz.webp"
                    />
                </label>
                <br />
                <br />
                <a href="index.html">
                    <li>Inicio</li>
                </a>
                <a href="nosotros/nosotros.html">
                    <li>Nosotros</li>
                </a>
                <a href="portal cobranza/portalCobranzas.html">
                    <li>Potal de cobranzas</li>
                </a>
                <a href="../preguntasfrecuentes/preguntas.html">
                    <li>Preguntas Frecuentes</li>
                </a>
                <a href="./nosotros/nosotros.html#Contacto">
                    <li>Contacto</li>
                </a>
                <a href="login.php">
                    <li>Iniciar sesión</li>
                </a>
                <br />
                <br />
                </ul>
            </div>
            </div>
        </div>
        </header>
    );
    }

    export default Header;
