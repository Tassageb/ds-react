import {quizApiRouter} from "./api/quiz";

const express = require('express')
const app = express()

app.use(express.json()) //Permet le parsage du JSON

app.use("/api/", quizApiRouter)

app.listen(3001, () => {
    console.log("Back-end started ::3001")
})
