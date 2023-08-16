import { Message } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class Base64Command implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (args.length < 1) {
            message.reply("Use: !base64 base64")
        } else {
            let base64 = args.join(" ")
            try{
            let buff = new Buffer(base64, 'base64');
            base64 = buff.toString()
            message.reply("Resultado:\n"+base64)
            }catch(ex) {
                message.reply("Base64 inválido.")
            }
        }
    }
    getPermission(): number {
        return null
    }
    getName(): string {
        return "base64"
    }
    getAliases(): string[] {
        return []
    }

}