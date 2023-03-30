import {exampleRouter} from "./api/example";

const express = require('express')
const app = express()

app.use(express.json()) //Permet le parsage du JSON

app.use("/api/example", exampleRouter)

app.listen(3001, () => {
    console.log("Back-end started ::3001")
})
