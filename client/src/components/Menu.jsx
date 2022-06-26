import {NavLink} from "react-router-dom";

export function Menu(){
    return (
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="/">Блог</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                        aria-label="Toggle navigation">
                    Меню
                    <i className="fas fa-bars"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto py-4 py-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link px-lg-3 py-3 py-lg-4" to="/">Главная</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link px-lg-3 py-3 py-lg-4" to="/login">Войти</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link px-lg-3 py-3 py-lg-4" to="/logout">Выйти</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link px-lg-3 py-3 py-lg-4" to="/reg">Регистрация</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}