import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class BotInfoCommand implements BaseCommand {
    commandNumber: number;
    execute(message: Message, args: string[]): void {
        let embed : MessageEmbed = new MessageEmbed();
        embed.color = 0x0088FF
        embed.addField("**Dono do bot**:", "<@846801518874198056>", true)
        embed.addField("**Nome do bot**:", "ComuniMine", true)
        embed.addField("**Como utilizar**:", `
        Olá, eu sou o ComuniMine!
Um Bot feito para moderar o discord
e para manter o chat seguro,
caso queria saber mais informações sobre um comando utilize \`!ajuda\` ou \`!help\`.`, false)
embed.addField("**Prefixo do bot**:", "`!`", true)
embed.addField("**Linguagem de programação:**", "`TypeScript`, `NodeJS`", false)
embed.addField("**Versões:**", "`TypeScript: 4.4.3`, `NodeJS: "+process.version+"`", false)
embed.addField("**Número de comandos:**", this.commandNumber, false)
        message.channel.send(embed)
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "botinfo"
    }
    getAliases(): string[] {
        return ["infobot"]
    }

}