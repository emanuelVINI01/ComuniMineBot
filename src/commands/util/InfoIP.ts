import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../BaseCommand.js";
import fetch from "node-fetch";
export default class InfoIP implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (args.length != 1) {
            message.reply("Use: !ipinfo ip/dominio")
        } else {
            message.reply("Buscando...").then(msg => {
                fetch("http://ip-api.com/json/"+args[0]).then(res => {
                    res.json().then(jso => { 
                        if (jso.status === "success") {
                            let embed : MessageEmbed = new MessageEmbed()
                            embed.title = `Informações dê ${args[0]}`
                            embed.addField("<:confiig:818808136747974677> IP", jso.query, true)
                            embed.addField("<:confirmar:883043557764632596> Provedor", jso.isp, true)
                            embed.addField("<:mundo:819246545505091666> Pais", `${jso.country} (${jso.countryCode})`, true)
                            embed.addField("<:mundo:819246545505091666> Cidade", jso.city, true)
                            embed.addField("<:mundo:819246545505091666> Estado", jso.regionName, true)
                            msg.edit(embed)
                        } else {
                            msg.edit("Falha ao localizar esse ip.")
                        }
                    }
                    )
                })
            })
        }
    }
    getPermission(): number {
        return null
    }
    getName(): string {
        return "infoip"
    }
    getAliases(): string[] {
        return ["geoip","ipinfo"]
    }

}