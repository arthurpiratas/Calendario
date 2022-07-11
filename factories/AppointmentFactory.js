class AppointmentFactory {

    Build(simpleAppointment){

        var day = simpleAppointment.date.getDate()+1
        var moth = simpleAppointment.date.getMonth()
        var year = simpleAppointment.date.getFullYear()

        var hour = Number.parseInt(simpleAppointment.time.split(":")[0]) 
        var minutes = Number.parseInt(simpleAppointment.time.split(":")[1]) 

        var startDate = new Date(year, moth, day, hour, minutes,0,0)
        var startEnd = new Date(year, moth, day, (hour+2), minutes,0,0)


        var appo = {
            id: simpleAppointment._id,
            title: simpleAppointment.name + " - " + simpleAppointment.description,
            start: startDate,
            end: startEnd
        }

        return appo
    }


}

module.exports = new AppointmentFactory();