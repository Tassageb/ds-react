import {Question} from "../../models/models";
import React, {useState} from "react";
import {CreateQuestionField} from "./createQuestionField";

type CreateQuestionProps = {
    callback : (val : Question) => void
}
export const CreateQuestion = (props : CreateQuestionProps) => {
    const [name, setName] = useState<string>("")
    const [choices, setChoices] = useState<string[]>([])
    const [valid, setValid] = useState<number>(0)

    const handleChangeName = (e : any) => {
        setName(e.target.value)
    }

    const changeField = (index : number, checked : boolean, name: string)  => {
        let items = [...choices]
        items[index] = name
        if (checked){
            setValid(index)
        }
        setChoices([...items])
    }

    const addField = () => {
        setChoices([...choices, ""])
    }

    const clear = () => {
        setValid(0)
        setChoices([])
        setName("")
    }

    const send = () => {
        if (choices.length > 1){
            props.callback({
                name,
                choices,
                valid
            })
            clear()
        } else {
            console.log("pas assez de choix")
        }
    }

    return (
        <div className={"box new-question"}>
            <div className={"name"}>
                <label htmlFor={"name"}>Question : </label>
                <input id={"name"} type={"text"} value={name} onChange={handleChangeName}/>
            </div>

            <div className={"choices"} onChange={(e : any) => {console.log(e.target.value)}}>
                <button onClick={addField}>Ajouter une réponse</button>
                {
                    choices.map((val, index) =>
                        <CreateQuestionField key={index} id={index} checked={index === valid} name={val} callback={(valid, name) => {
                            changeField(index, valid, name)}}
                        />
                    )
                }
            </div>
            <div className={"utils"}>

                <button onClick={send}>Ajouter !</button>
                <button onClick={clear}>Reinitialiser</button>
            </div>

        </div>
    )
}
