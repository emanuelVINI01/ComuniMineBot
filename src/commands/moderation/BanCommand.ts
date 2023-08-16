import { GuildMember, Message, Permissions } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class BanCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (args.length != 1) {
            message.reply("Use: !ban usuário")
        } else {
            let m : GuildMember = message.guild.members.cache.get(args[0].replace("@","").replace("!","").replace("<","").replace(">", ""));
            if (m !== undefined && m !== null ) {
                m.ban().then(() => {
                    message.reply("Banido com sucesso.")
                }).catch(() => {
                    message.reply("O cargo desse usuário é maior do que o meu.")
                })
            } else {
                message.reply("Não encontrei esse membro.")
            }
        }
    }
    getPermission(): number {
        return Permissions.FLAGS.BAN_MEMBERS;
    }
    getName(): string {
        return "ban";
    }
    getAliases(): string[] {
        return ["banir", "banido"];
    }
    isDefault() : boolean {
        return true;
    }

}