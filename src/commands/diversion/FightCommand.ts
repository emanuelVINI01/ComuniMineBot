import { GuildMember, Message } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class FightCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if(args.length > 0) {
            let m: GuildMember = message.guild.members.cache.get(args[0].replace("@", "").replace("!", "").replace("<", "").replace(">", ""));
            if (m !== undefined && m !== null) {
                let id : string = null;
                let loser : string = null;
                if (!Math.round(Math.random())) {
                    id = m.id;
                    loser = message.member.id;
                } else {
                    id = message.member.id;
                    loser = m.id;
                }
                message.channel.send(`<@${id}> bateu em <@${loser}>!`)
            } else {
                message.reply("Não encontrei esse membro.")
            }
        } else {
            message.reply("Use: !fight usuário")
        }
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "fight";
    }
    getAliases(): string[] {
        return ["duelo"];
    }

}