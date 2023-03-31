export type Question = {
    name : string
    choices : string[]
    valid : number
}

export type Quiz = {
    id : number
    name : string
    questions : Question[]
}