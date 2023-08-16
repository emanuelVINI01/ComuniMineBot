import { Message } from "discord.js";
import BaseCommand from "../BaseCommand.js";
import quickdb from 'quick.db'
import BotUtils from "../../BotUtils.js";
export default class WorkCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        const membro = message.member;
        let timetout = 14400000; 
    
        let diaria = quickdb.fetch(`work_${membro.id}`)
    
        if(diaria !== null && timetout - (Date.now() - diaria) > 0) {
            
            message.reply("Você já trabalhou com sucesso, espere até 4 horas para poder trabalhar novamente.")
            
        } else {
            let amount = BotUtils().getRandomInt(70, 700);
            message.reply(`Você trabalhou com sucesso. Ganhou ${amount} coins!`)
            quickdb.add(`money_${membro.id}`, amount)
            quickdb.set(`work_${membro.id}`, Date.now())
        }
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "work"
    }
    getAliases(): string[] {
        return ["trabalhou"]
    }

}