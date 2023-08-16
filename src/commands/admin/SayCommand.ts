import { Message, Permissions } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class SayCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (args.length < 1) {
            message.reply("Use: !say mensagem")
        } else if (args.join(" ").length > 2048) {
            message.reply("O máximo do say é 2048 letras")
        }  
        else {
            message.channel.send(args.join(" "))
            message.delete()
        }
    }
    getPermission(): number {
        return Permissions.FLAGS.ADMINISTRATOR;
    }
    getName(): string {
        return "say"
    }
    getAliases(): string[] {
        return ["dizer", "falar"]
    }
    
}