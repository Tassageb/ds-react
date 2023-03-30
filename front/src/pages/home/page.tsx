import {useEffect, useState} from "react";


interface User{
    name : String
}

export const Home = () => {

    const [users, setUsers] = useState<User[]>()

    useEffect(() => {
        fetch("/api/example/users/").then(res => {
            if (res.ok){
                return res.json()
            }
        }).then(users_res => {
            setUsers(users_res)
        })
    },[])

    return (
        <>
            <h1>Home</h1>
            {users ? (
                users.map((elt) => <p>Salut a toi jeune {elt.name}</p>)
            ) : (
                <p>Chargement</p>
            )}
        </>
    )
}