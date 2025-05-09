import { competitionsSchema } from "../Model/Competions.js"
 
export const RegisterId = async(id,Registered,userId)=>{
    const competition = await competitionsSchema.findById(id)
    console.log(id)
    const SubTypes = competition.subTypes

    const competitionSubType = competition.subTypes.find((item)=> item.name==Registered)
    const registered = [...competitionSubType.registered,userId]

    const subTypes = SubTypes.map((item)=>{
        if(item.name==Registered){
            return {...item,registered}
        }
        return item
    })

    const updateCompetition = await competitionsSchema.findByIdAndUpdate(id,{subTypes}, {new:true})
    
}
