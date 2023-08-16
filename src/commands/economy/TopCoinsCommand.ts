import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../BaseCommand.js";
import quickdb from 'quick.db'
export default class TopCoinsCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        let myMap = new Map();
        message.guild.members.cache.forEach(each => {
            myMap.set(each.id, quickdb.get("money_"+each.id))
        })
        const mapSort1 = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));

        let embed : MessageEmbed = new MessageEmbed()
        embed.title = "Top coins"
        embed.color = 0x0088FF
        embed.description = ""
        let exec : number = 1;
        if (mapSort1.size < 10) {
            mapSort1.forEach((value, key) => {
                if (value != null && value != 0)
                    embed.description += `${exec}. <@${key}> ⇨ ${value}\n`
                exec++
            })
        } else {
            mapSort1.forEach((value, key) => {
                if (exec <= 10) {
                    if (value != null && value != 0)
                        embed.description += `${exec}. <@${key}> ⇨ ${value}\n`
                } 
                exec++;
            })
        } 
        message.channel.send(embed)
    }
    getPermission(): number {
        return null
    }
    getName(): string {
        return "topcoins"
    }
    getAliases(): string[] {
        return ["bestcoins"]
    }

}