import { GuildMember, Message, MessageEmbed } from "discord.js";
import BaseCommand from "../BaseCommand.js";
import moment from 'moment'
export default class UserInfoCommand implements BaseCommand {
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
            embed.title = `Informações do usuário ${mb.displayName}`;
            embed.addField("💼 Nome", mb.user.username, true);
            embed.addField("🛡 ID", mb.id, true);
            embed.addField("📨 Tag", mb.user.tag.split("#")[1], false);
            embed.addField("<:megafone:890728168917458965> Entrou no servidor", moment.utc(mb.joinedAt).format('YYYY/MM/DD'), false);
            embed.addField("⏰ Conta criada", moment.utc(mb.user.createdAt).format('YYYY/MM/DD'), false);
            try{
            embed.setThumbnail(mb.user.avatarURL())
            }catch(ex) {

            }
            message.reply(embed);
        }
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "userinfo";
    }
    getAliases(): string[] {
        return ["infouser"];
    }

}