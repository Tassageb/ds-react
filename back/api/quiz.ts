import {PrismaClient, Prisma} from "@prisma/client";
import {Router, Request, Response} from "express";
import {Quiz} from "../models/models";

export const quizApiRouter = Router()
const prisma = new PrismaClient()

quizApiRouter.get("/list", (req : Request, res : Response) => {
    prisma.quiz.findMany({
        include : {                 //On renvoie les noms de toutes les questions mais pas le valid
            questions : {
                select : {
                    name : true
                }
            }
        }
    }).then(result => {
        res.json(result)
    }).catch((e : Error) => {
        res.status(500).end()
    })
})

quizApiRouter.get("/:id", (req : Request, res : Response) => {
    const {id} = req.params
    if (id){
        prisma.quiz.findUnique({
            where : {
                id : parseInt(id)
            },
            include : {
                questions : {
                    select : {                  //On ne renvoie pas le valid
                        name : true,
                        choices : true
                    }
                }
            }
        }).then(quiz => {
            res.json(quiz)
        }).catch((e : Error) => {
            console.log(e)
            res.status(500).end()
        })
    } else {
        res.status(400).end()
    }
})

quizApiRouter.put("/create", (req : Request, res : Response) => {
    let quiz : Quiz = req.body
    if (req.body){
        prisma.quiz.create({
            data : {
                name : quiz.name,
                questions : {
                    create : quiz.questions.map(elt => {
                        return {
                            name : elt.name,
                            valid : elt.valid,
                            choices : {
                                create : elt.choices.map( (elt) => {
                                    return {
                                        name : elt
                                    }
                                })
                            }
                        }
                    })
                }
            }
        }).then(result => {
            console.log(result)
            res.end()
        }).catch((e : Error) => {
            console.log(e)
            res.status(500).end()
        })
    }
})