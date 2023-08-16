import { GuildMember, Message, MessageEmbed } from "discord.js";
import moment from "moment";
import BaseCommand from "../BaseCommand.js";

export default class AvatarCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        let mb : GuildMember = null;
        if (args.length == 0) {
            mb = message.member;
        } else {
            let m: GuildMember = message.guild.members.cache.get(args[0].replace("@", "").replace("!", "").replace("<", "").replace(">", ""));
            if (m !== undefined && m !== null) {
                mb = m;
            } 
        }
        if (mb == null ){ 
            message.reply("Não encontrei esse membro.")
        } else {
            let embed : MessageEmbed = new MessageEmbed();
            embed.color = 0x0088FF
            embed.title = `Avatar do usuário ${mb.displayName}`;
            try{
                embed.setImage(mb.user.avatarURL()+"?size=256")
                embed.description = `Clique [aqui](${mb.user.avatarURL()+"?size=256"}) para baixar a imagem.`
            }catch(ex) {

            }
            message.reply(embed);
        }
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "avatar"
    }
    getAliases(): string[] {
        return ["icon", "icone"]
    }

}