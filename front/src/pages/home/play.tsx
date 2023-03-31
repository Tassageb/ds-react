import {useEffect, useState} from "react";
import {Quiz} from "../../models/models";

type PlayProps = {
    pseudo : string,
    quizId : number,
    close : () => void
}
export const Play = (props : PlayProps) => {

    const [quiz, setQuiz] = useState<Quiz>()
    const [step, setStep] = useState<number>(0)
    const [responses, setResponses] = useState<number[]>([])

    useEffect(() => {
        fetch("/api/"+props.quizId).then(res => {
            if (res.ok){
                return res.json()
            }
        }).then(json => {
            setQuiz(json)
        })
    }, [])

    const handleResponse = (id : number) => {
        let items = [...responses]
        items[step] = id
        setResponses([...items])
    }

    const next = () => {
        if (responses.length > step){
            setStep(step+1)
        }
    }

    const submit = () => {
        console.log(responses)
        props.close()
    }

    return (
        <div className={"play"}>
            <h1>Jouer</h1>
            {quiz ? (
                <div>
                    { quiz.questions[step] ? (<>
                        <h2>{quiz.questions[step].name}</h2>
                        <div>
                            {quiz.questions[step].choices.map((elt:any, index) =>
                                <div key={index}>
                                    <label htmlFor={elt.name}>{elt.name}</label>
                                    <input id={elt.name} type={"radio"} value={elt.name} name={"choix"} onChange={() => {handleResponse(index)}} />
                                </div>
                            )}
                        </div>
                        <button onClick={next}>Question suivante</button>
                    </>) : (
                        <div>
                            <button onClick={submit}>Envoyer la réponse</button>
                        </div>
                    )}
                </div>
            ) : (
                <p>Chargement</p>
            )}
        </div>
    )
}