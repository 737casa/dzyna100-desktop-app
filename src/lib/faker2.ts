import faker from "faker"


export default function createFaker2(){

    return ({
        name:()=>faker.name.findName(),
        email:()=>faker.internet.email(),
        dob(){
            const datefrom = new Date()
            datefrom.setFullYear(1980)
            const dateto = new Date()
            dateto.setFullYear(2000)
            return faker.date.between(datefrom,dateto)
        },
        password:()=>faker.internet.password()
    })
}