import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class OnlineCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        let embed = new MessageEmbed()
        embed.title = "Informação do servidor."
        embed.color = 0x0088FF
        embed.description = `<a:tubarao:817439550863441940> __Somos__ ${message.guild.memberCount} membros no Discord.
`
        embed.setFooter("Obrigado a todos vocês.")
        message.channel.send(embed)
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "online"
    }
    getAliases(): string[] {
        return ["disponivel", "membros"]
    }

}