import {useEffect, useState} from "react";
import {Quiz} from "../../models/models";
import {Play} from "./play";

export const Home = () => {
    const [playing, setPlaying] = useState<boolean>(false)

    const [quizs, setQuizs] = useState<Quiz[]>([])
    const [selected, setSelected] = useState<number>()

    const [pseudo, setPseudo] = useState<string>("")
    const handlePseudoChange = (e : any) => {
        setPseudo(e.target.value)
    }

    useEffect(() => {
        fetch("/api/list").then(res => {
            if (res.ok){
                return res.json()
            } else {
                throw new Error("pas bon")
            }
        }).then(json => {
            setQuizs(json)
        })
    }, [])

    const play = () => {
        if (pseudo && selected && quizs[selected]){
            setPlaying(true)
        }
    }

    const stopPlay = () => {
        setPlaying(false)
    }

    return (
        <>
            <div className={"box"}>
                <h1>Choix du quiz</h1>
                <div className={"quiz-list"}>
                    {
                        quizs ? (
                            quizs.map((elt, index) => <div onClick={() => {setSelected(index)}} key={index} className={"quiz" + (selected === index ? " selected" : "")}>
                                <h2>{elt.name}</h2>
                                <p>{elt.questions.length} questions</p>
                            </div>)
                        ) : (
                            <p>Chargement</p>
                        )
                    }
                </div>
            </div>
            <div className={"utils"}>
                <input value={pseudo} onChange={handlePseudoChange} placeholder={"Votre nom"}/>
                <button onClick={play}>JOUER !</button>
            </div>

            {
                (playing && selected && quizs[selected]) && <Play close={stopPlay} pseudo={pseudo} quizId={quizs[selected].id}/>
            }
        </>
    )
}