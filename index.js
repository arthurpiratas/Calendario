const express = require("express")
const app = express()
const mongoose = require("mongoose")
const AppointmentService = require("./serices/AppointmentService")
const appointmentService = require("./serices/AppointmentService")

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/agendamento")

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/cadastro", (req,res) => {
    res.render("create.ejs")
})

app.post("/create", async (req, res) => {
    
    

    let status = await appointmentService.create(req.body.name, req.body.email, req.body.description, req.body.cpf,req.body.date, req.body.time)
    


    if(status){
        res.status(200)
        res.redirect("/")
    }else{
        res.status(400)
        res.send("Ocorreu uma falha mo agendamento!")
    }
})

app.get("/getcalendar", async (req, res) => {
    let consultas = await AppointmentService.getAll(false)
    //res.status(200)
    res.json(consultas)
})


app.get("/event/:id", async (req,res) => {

    if(await AppointmentService.getById(req.params.id) == undefined){
        res.redirect("/")
    }else{
        let consulta = await AppointmentService.getById(req.params.id)
        console.log(consulta)
        res.render("event.ejs", {appo: consulta})
    }

    
})

app.listen(8686,() => {
    console.log("Servidor rodando")
});

