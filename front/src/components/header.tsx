import {Link, NavLink} from "react-router-dom";

export const Navigation = () => {
    return <nav>
        <h1>Kwiz</h1>
        <div>
            <NavLink className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
            } to={"/"}>Jouer</NavLink>
            <NavLink className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
            } to={"/create"}>Créer un quiz</NavLink>
            <NavLink className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
            } to={"/history"}>Historique</NavLink>
        </div>
    </nav>
}