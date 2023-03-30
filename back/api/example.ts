import {PrismaClient} from "@prisma/client";
import {Router, Request, Response} from "express";

export const exampleRouter = Router()
const prisma = new PrismaClient()

//plein d'exemples https://www.prisma.io/express

exampleRouter.get("/users/", (req : Request, res : Response) => {
    prisma.user.findMany({
        //include : {                   //Permet d'intégrer avec tous les posts de l'utilisateur
        //    posts : true
        //}
    }).then(users => {
        res.json(users)
    }).catch((e) => {
        console.error(e)
        res.status(500).end()
    })
})

exampleRouter.get("/users/:id", (req : Request, res : Response) => {
    const { id } = req.params
    if (id){
        prisma.user.findUnique({
            where : {
                id : parseInt(id) //On transforme le paramètre en entier
            }
        }).then( user => {
            if (user){
                res.json(user)
            } else {
                res.status(404).end()
            }
        }).catch((e) => {
            console.error(e)
            res.status(500).end()
        })
    } else {
        res.status(400).end()
    }
})

exampleRouter.put("/users/new", (req : Request, res  : Response) => {
    if (req.body){
        const {name, password} = req.body
        if (name && password){
            prisma.user.create({
                data : {name, password}
            }).then( user => {
                res.json(user)
            }).catch((e) => {
                console.error(e)
                res.status(500).end()
            })
        } else {
            res.status(400).end()
        }
    } else {
        res.status(400).end()
    }
})


exampleRouter.get("/posts/", (req : Request, res : Response) => {
    prisma.post.findMany({
        include : {                   //Permet d'intégrer avec tous l'utilisateur correspondant
            user : true
        }
    }).then(users => {
        res.json(users)
    }).catch((e) => {
        console.error(e)
        res.status(500).end()
    })
})

exampleRouter.put("/posts/new", (req : Request, res  : Response) => {
    if (req.body){
        const {desc, userId} = req.body
        if (desc && userId){
            prisma.post.create({
                data : {desc, userId}
            }).then( post => {
                res.json(post)
            }).catch((e) => {
                console.error(e)
                res.status(500).end()
            })
        } else {
            res.status(400).end()
        }
    } else {
        res.status(400).end()
    }
})

exampleRouter.delete("/posts/delete/:id", (req : Request, res : Response) => {
    const { id } = req.params
    if (id){
        prisma.post.delete({
            where : {
                id : parseInt(id)
            }
        }).then(result => {
            res.json(result)
        }).catch((e) => {
            console.error(e)
            res.status(500).end()
        })
    } else {
        res.status(400).end()
    }
})