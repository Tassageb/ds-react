import {Link} from "react-router-dom";

export const Navigation = () => {
    return <nav>
        <ul>
            <li><Link to={"/users"}>Coucou</Link></li>
        </ul>
    </nav>
}