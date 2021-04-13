import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import bem from 'easy-bem';
import './NavBar.scss';

const b = bem('nav-bar');

export default function NavBar() {

    const { isAuth, logout } = useAuth();

    return isAuth ? (
        <nav className={b()}>
            <ul className={b('links')}>
                <li>
                    <Link className={b('link')} to="/">Главная</Link>
                </li>

                <li>
                    <Link className={b('link')} to="/orders">Заявки</Link>
                </li>

                <li>
                    <Link className={b('link')} to="/masters">Мастера</Link>
                </li>

                <li>
                    <button className={b('btn')} onClick={logout}>Logout</button>
                </li>
            </ul>
        </nav>
    ) : null;
}