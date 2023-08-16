import { Message } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class EvalCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (message.author.id === "846801518874198056") {
            if (args.length < 1 ) {
                message.reply("Use: !args código")
            } else {
                
                let resp;
                try {
                    resp = eval(args.join(" "))
                }catch(ex) {

                }
                if (resp != undefined) {
                    message.reply(`\nEntrada: ${args.join(" ")}\n\n\nSaída: ${resp}`)
                } else {
                    message.reply(`\nEntrada: ${args.join(" ")}\n\n\nSaída: Nada`)
                }
            }
        } else {
            message.reply("Apenas pessoas especiais podem usar isso :3")
        }
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "eval"
    }
    getAliases(): string[] {
        return []
    }

}