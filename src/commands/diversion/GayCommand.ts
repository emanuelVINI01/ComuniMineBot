import { GuildMember, Message } from "discord.js";
import BaseCommand from "../BaseCommand.js";
import BotUtils from "../../BotUtils.js";
export default class GayCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if(args.length > 0) {
            let m: GuildMember = message.guild.members.cache.get(args[0].replace("@", "").replace("!", "").replace("<", "").replace(">", ""));
            if (m !== undefined && m !== null) {
                message.channel.send(`:rainbow_flag: | Eu acho que o(a)<@${m.id}> é **${BotUtils().getRandomInt(0, 100)}%** gay.`)
            } else {
                message.reply("Não encontrei esse membro.")
            }
        } else {
            message.reply("Use: !gay usuário")
        }
    }
    getPermission(): number {
        return null
    }
    getName(): string {
        return "gay"
    }
    getAliases(): string[] {
        return ["viado"]
    }

}