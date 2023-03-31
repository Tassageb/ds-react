type CreateQuestionFieldProps = {
    id : number
    checked : boolean
    name : string
    callback : (valid : boolean, name : string) => void
}
export const CreateQuestionField = (props : CreateQuestionFieldProps) => {
    const handleNameChange = (e : any) => {
        props.callback(props.checked, e.target.value)
    }

    const handleCheckedChange = (e : any) => {
        console.log("checked")
        props.callback(true, props.name)
    }

    return (
        <div>
            <label >{props.id} : </label>
            <input type={"text"} value={props.name} onChange={handleNameChange}/>
            <input type={"radio"} checked={props.checked} name={"valid"} onChange={handleCheckedChange}/>
        </div>
    )
}
