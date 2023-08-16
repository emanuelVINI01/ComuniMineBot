import { Message, MessageEmbed, TextChannel } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class SugerirCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (args.length < 1) {
            message.reply("Use: !sugerir sugestão")
        } else if (args.join(" ").length > 300) {
            message.reply("Sua sugestão é muito grande! O limite é 300 letras")
        } 
        else {
            let channel : TextChannel = (message.guild.channels.cache.get("819395512544919603") as TextChannel)
            let embed : MessageEmbed = new MessageEmbed()
            embed.title = "ComuniMine • Sugestões"
            embed.description = `Sugestão de <@${message.author.id}>`
            embed.addField("**SUGESTÃO**", args.join(" "), false)
            embed.color = 0x0088FF
            channel.send(embed).then(msg => {
                msg.react("✅")
                msg.react("❌")
            })
            message.reply("Sugestão enviada com sucesso.")
        }
    }
    getPermission(): number {
        return null
    }
    getName(): string {
        return "sugerir"
    }
    getAliases(): string[] {
        return ["sugestão", "sugestao"]
    }

}