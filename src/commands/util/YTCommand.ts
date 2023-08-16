import { Message, TextChannel } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class YTCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (message.member.roles.cache.has("859344518323109888") ) {
            if (args.length != 1) {
                message.reply("Use: !yt url")
            } else {
                if (message.content.includes("http://") || message.content.includes("https://")) {
                    let url : string = args[0].replace("@","")

                    if (url.length > 256) {
                        message.reply("URL muito grande!")
                    } else {
                        let channel : TextChannel = message.guild.channels.cache.get("859070940449341511") as TextChannel
                        channel.send(`Novo video no canal de ${message.member.displayName}\n\n`+url+"\n\nDê sua opinião sobre o video abaixo.").then(msg => {
                            msg.react(msg.guild.emojis.cache.get("883043128322433074"))
                            msg.react(msg.guild.emojis.cache.get("883043145955295252"))
                            msg.react(msg.guild.emojis.cache.get("883043168180912139"))
                            msg.react(msg.guild.emojis.cache.get("883043184983277618"))
                            msg.react(msg.guild.emojis.cache.get("883043206730752041"))
                        })
                        message.reply("Divulgação feita com sucesso.")
                    }
                } else {
                    message.reply("URL inválido!")
                }
            }
        } else {
            message.reply("Somente youtubers podem usar isso.")
        }
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "yt"
    }
    getAliases(): string[] {
        return ["youtuber"]
    }
    
}