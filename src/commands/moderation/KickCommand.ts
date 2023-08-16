import { GuildMember, Message, Permissions } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class KickCommand implements BaseCommand {

    execute(message: Message, args: string[]): void {
        if (args.length != 1) {
            message.reply("Use: !kick usuário")
        } else {
            let m : GuildMember = message.guild.members.cache.get(args[0].replace("@","").replace("!","").replace("<","").replace(">", ""));
            if (m !== undefined && m !== null ) {
                m.kick().then(() => {
                    message.reply("Expulso com sucesso.")
                }).catch(() => {
                    message.reply("O cargo desse usuário é maior do que o meu.")
                })
            } else {
                message.reply("Não encontrei esse membro.")
            }
        }
    }
    getPermission(): number {
        return Permissions.FLAGS.KICK_MEMBERS;
    }
    getName(): string {
        return "kick";
    }
    getAliases(): string[] {
        return ["kikar"];
    }
    isDefault() : boolean {
        return true;
    }

}