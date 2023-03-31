export type Question = {
    name : string
    choices : string[]
    valid : number
}

export type Quiz = {
    name : string
    questions : Question[]
}