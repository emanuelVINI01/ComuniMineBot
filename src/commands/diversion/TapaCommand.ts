import { GuildMember, Message, MessageEmbed } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class TapaCommand implements BaseCommand {
    private gifs: Array<string> = ["https://c.tenor.com/Q7gJPYeqX_MAAAAS/cat-punch.gif", "https://c.tenor.com/vr7tTAEuj1QAAAAC/baka-slap.gif"];
    rand(items: any[]): any {

        return items[items.length * Math.random() | 0];
    }
    execute(message: Message, args: string[]): void {
        if (args.length > 0) {
            let m: GuildMember = message.guild.members.cache.get(args[0].replace("@", "").replace("!", "").replace("<", "").replace(">", ""));
            if (m !== undefined && m !== null) {
                let embed: MessageEmbed = new MessageEmbed();
                embed.setImage(this.rand(this.gifs));
                embed.description = `<@${message.member.id}> bateu em <@${m.id}>!`
                message.channel.send(embed);
            } else {
                message.reply("Não encontrei esse membro.")
            }
        } else {
            message.reply("Use: !tapa @user")
        }
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "tapa";
    }
    getAliases(): string[] {
        return ["bater"];
    }

}