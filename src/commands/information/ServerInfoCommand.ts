import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../BaseCommand.js";
import moment from 'moment'
export default class ServerInfoCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        let embed : MessageEmbed = new MessageEmbed();

        embed.color = 128282;
        message.guild.members.fetch(message.guild.ownerID).then(owner => {
            let ownert = owner.user.tag
            embed.title = `Informações do servidor`
            embed.color = 0x0088FF
            embed.addField("<:megafone:890728168917458965> Nome",message.guild.name, true)
            embed.addField("🛡 ID",message.guild.id, true)
            embed.addField("💼 Dono",ownert, true)
            embed.addField("<:staff:819246102938386462> Membros",message.guild.memberCount, true)
            embed.addField("<:confirmar:883043557764632596> Cargos",message.guild.roles.cache.size, true)
            embed.addField("📨 Canais",message.guild.channels.cache.size, true)
            embed.addField("<:manuten:819246194333057025> Região",message.guild.region, true)
            embed.addField("⏰ Criado em",moment.utc(message.guild.createdAt).format('YYYY/MM/DD'), true);
            embed.addField("<:foguete:817438134248669197> Boosts", `${message.guild.premiumSubscriptionCount}`, true);
            try{
                embed.setThumbnail(owner.guild.iconURL())
                }catch(ex) {
                    
                }
            message.reply(embed);
        });
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "serverinfo";
    }
    getAliases(): string[] {
        return ["infoserver"];
    }

}