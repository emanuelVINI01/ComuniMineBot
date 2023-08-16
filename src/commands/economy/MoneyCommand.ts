import { GuildMember, Message, MessageEmbed } from "discord.js";
import BaseCommand from "../BaseCommand.js";
import quickdb from 'quick.db'
export default class MoneyCommand implements BaseCommand {
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
            
            try{
                if (!quickdb.has(`money_${mb.id}`)) {
                    quickdb.set(`money_${mb.id}`, 0)
                }
                let money = quickdb.fetch(`money_${mb.id}`)
                if (message.member.id == mb.id ) {
                    message.reply(`Você tem ${money} coins.`)
                }
                else {
                    message.reply(`<@${mb.id}> tem ${money} coins.`)
                }
            }catch(ex) {

            }
        }
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "money";
    }
    getAliases(): string[] {
        return ["coins"];
    }

}