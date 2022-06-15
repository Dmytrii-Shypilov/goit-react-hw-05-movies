import { NavLink, Link } from "react-router-dom";
import s from './header.module.css'

const getClassName = ({isActive}) => {
   return isActive ? `${s.link} ${s.active}` : s.link
}

const Header = () => {
    return (
        <header className={s.header}>
            <nav>
                <Link to="/" className={s.logo}>
                    MyMovies
                </Link>
                <ul className={s.list}>
                    <li className={s.listItem}>
                        <NavLink className={getClassName}  to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className={s.listItem}>
                        <NavLink className={getClassName}  to="/movies">
                            Movies
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header