import { competitionsSchema } from "../Model/Competions.js"
 
export const RegisterId = async(id,Registered)=>{
    const competition = await competitionsSchema.findById(id)
    console.log(req.body.id)
    const SubTypes = competition.subTypes

    const competitionSubType = competition.subTypes.find((item)=> item.name==Registered)
    const registered = [...competitionSubType.registered,req.userId]

    const subTypes = SubTypes.map((item)=>{
        if(item.name==Registered){
            return {...item,registered}
        }
        return item
    })

    const updateCompetition = await competitionsSchema.findByIdAndUpdate(req.body.id,{subTypes}, {new:true})
    
}
