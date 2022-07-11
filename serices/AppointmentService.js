const appointment = require("../models/Appointment")
const AppointmentFactory = require("../factories/AppointmentFactory")
const mongoose = require("mongoose")

const Appo = mongoose.model("Appointment", appointment)

class AppointmentService {
    async create(name, email, description, cpf, date, time){
        let newAppo = new Appo({
            name, 
            email,
            description,
            cpf,
            date,
            time, 
            finished: false
        })

        try{
            await newAppo.save()
            return true
        }catch(err){
            console.log(err)
            return false
        }


        
    }

    async getAll(showFinished){
        if(showFinished){
            return await Appo.find();


        }else{
            let appos = await Appo.find({'finished':false})
            let appointments = []

            appos.forEach(appointment => {
                if(appointment.date != undefined){
                    appointments.push(AppointmentFactory.Build(appointment))
                }
            })

            return appointments;
        }
    }

    async getById(id){
        
        try{
            let event = await Appo.findOne({'_id': id})
            return event;
        }catch(err){
            console.log(err)
        }

    }

    async Finish(id){

        try{
            await Appo.findByIdAndUpdate({'_id': id},{finished:true})
            return true
        }catch(err){
            console.log(err)
            return false
        }
    }

    async serach(query){
        try{
            let appos = await Appo.find().or([{email: query}, {cpf: query}])
            
            return appos
        }catch(err){
            console.log(err)
            return []
        }
        
    }
        
        
}

module.exports = new AppointmentService();