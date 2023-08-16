import { Message } from "discord.js";
import BaseCommand from "../BaseCommand";
import quickdb from 'quick.db'
export default class DailyCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        const membro = message.member;
        let timetout = 86400000; //24 hrs
        let quantia = 1000
    
        let diaria = quickdb.fetch(`diaria_${membro.id}`)
    
        if(diaria !== null && timetout - (Date.now() - diaria) > 0) {
            
            message.reply("Você já pegou sua recompensa diária hoje. Espera para pegar novamente. ")
            
        } else {
            message.reply(`Você pegou sua recompensa de ${quantia} diária com sucesso.`)
            quickdb.add(`money_${membro.id}`, quantia)
            quickdb.set(`diaria_${membro.id}`, Date.now())
        }
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "daily"
    }
    getAliases(): string[] {
        return ["diario"]
    }
    
}


