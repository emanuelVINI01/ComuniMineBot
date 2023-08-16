import { Message, MessageEmbed, Permissions } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class EmbedCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (args.length < 1) {
            message.reply("Use: !embed <mensagem> {@n para nova linha na mensagem}");
        }
        else if (args.join(" ").length > 1024) {
                message.reply("O máximo da embed é 1024 letras")
        } else {
            let messaged = "";

            args.forEach(each => {
                    messaged += each + " ";
            })
            messaged = messaged.replace("@n", "\n")
            let emebed = new MessageEmbed();

            emebed.description = messaged;
            emebed.color = 0x0088FF
            emebed.setTimestamp(Date.now())
            emebed.setAuthor(message.guild.name)
            message.channel.send(emebed);
            message.delete()
        }
    }
    getPermission(): number {
        return Permissions.FLAGS.ADMINISTRATOR;
    }
    getName(): string {
        return "embed";
    }
    getAliases(): string[] {
        return ["falar", "say2"];
    }

}