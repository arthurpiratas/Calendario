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
        res.render("event.ejs", {appo: consulta})
    }

    
})

app.post("/finish", async (req, res) => {
    let id = req.body.id
    let result = await AppointmentService.Finish(id)
    res.redirect("/")
})

app.get("/list", async (req, res) => {
    
    let appos = await AppointmentService.getAll(true)
    res.render("list.ejs", {appos})
})

app.get("/serachresult", async (req, res) => {
   let query = req.query.search
   let appos = await AppointmentService.serach(query.trim())

   if (appos.length == 0){

        let newAppos = await AppointmentService.getAll(true)
        let busca = query.trim()
        let tamanho =  busca.toUpperCase().length

        if(busca == '' || busca == ' '){
            tamanho = 0
        }else{
            let resultNewAppos = newAppos.filter(newAppo => newAppo.email.toUpperCase().slice(0,tamanho) == busca.toUpperCase().slice(0,tamanho))
            if(resultNewAppos.length <= 0){
                resultNewAppos = newAppos.filter(newAppo => newAppo.cpf.toUpperCase().slice(0,tamanho) == busca.toUpperCase().slice(0,tamanho))
            }
            appos = resultNewAppos
        }
   }
   res.render("list.ejs", {appos})
})

app.listen(8686,() => {
    console.log("Servidor rodando")
});

