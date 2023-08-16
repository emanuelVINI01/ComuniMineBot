import { Message } from "discord.js";
import BaseCommand from "../BaseCommand";
import stringMath from 'string-math'
export default class CalcCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (args.length < 1 ) {
            message.reply("Use: !calc conta")
        } else {
            let result;
            try{
                result = stringMath(args.join(" ").replace("x","*").replace(".","/"))
            }catch(ex) {
                result = "Não entendi essa conta"
            }
            message.reply(`Resultado: \n${result}`)
        }
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "calc"
    }
    getAliases(): string[] {
        return ["calcular"]
    }
    
}