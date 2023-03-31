import React, { useState} from "react";
import {Question, Quiz} from "../../models/models";
import {CreateQuestion} from "./createQuestion";
import {useNavigate} from "react-router-dom";


export const CreateQuiz = () => {
    const navigate = useNavigate()

    const [name, setName] = useState<string>("")

    const [questions, setQuestions] = useState<Question[]>([])

    const handleChangeName = (e : any) => {
        setName(e.target.value)
    }


    const addQuestion = (val : Question) => {
        setQuestions([...questions, val])
    }

    const send = () => {
        let quiz : Quiz = {
            id : 0,
            name,
            questions
        }

        if (quiz.name !== "" && quiz.questions.length > 0){
            console.log(JSON.stringify(quiz))
            let header = {
                method : "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(quiz)
            }

            fetch("/api/create", header).then(res => {
                if (res.ok){
                    navigate("/")
                } else {
                    console.error("error")
                }
            })
        } else {
            console.log("pas bon")
        }

    }

    return (
        <div className={"create-quiz"}>
            <div className={"box"}>
                <h1>Nouveau quiz</h1>
            </div>

            <div className={"box theme"}>
                <label htmlFor={"name"}>Theme : </label>
                <input id={"name"} type={"text"} value={name} onChange={handleChangeName}/>
            </div>
            <CreateQuestion callback={addQuestion}/>
            <div className={"box list"}>
                <h2>Liste des questions</h2>
                <ul>
                {questions.map((elt, i) =>
                    <li key={i}>
                        <h4>{elt.name}</h4>
                        <ul>
                            {elt.choices.map((choice, index) =>
                                <li key={index} className={index === elt.valid ? "valid" : ""}>{choice}</li>
                            )}
                        </ul>
                    </li>
                )}
                </ul>
            </div>
            <button onClick={send}>Envoyer</button>
        </div>
    )
}
