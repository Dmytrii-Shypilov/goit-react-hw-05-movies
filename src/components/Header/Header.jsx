import { NavLink } from "react-router-dom";
import s from './header.module.css'

const getStatus = ({isActive}) => {
   return isActive ? `${s.link} ${s.active}` : s.link
}

const Header = () => {
    return (
        <header className={s.header}>
            <nav>
                <span className={s.logo}>
                    MyMovies
                </span>
                <ul className={s.list}>
                    <li className={s.listItem}>
                        <NavLink className={getStatus}  to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className={s.listItem}>
                        <NavLink className={getStatus}  to="/movies">
                            Movies
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header