import { Message, MessageAttachment, MessageEmbed } from "discord.js";
import BaseCommand from "../BaseCommand.js";

import fetch from "node-fetch";
export default class ServerStatusCommands implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (args.length != 1) {
            message.reply("Use: !serverstatus ip")
        } else {
            message.reply("Conectando...").then(message => {
                fetch(`https://api.mcsrvstat.us/2/${args[0]}`).then(success => {
                    success.json().then(jso => {
                        
                        let embed = new MessageEmbed()
                        try{
                        const image = jso.icon;

                        const imageStream = new Buffer(image, 'base64');
                        let attach = new MessageAttachment(imageStream, "server_icon.png");
                        embed.attachFiles([attach])
                        embed.setImage("attachment://server_icon")
                        } catch(ex) {

                        }
                        if (jso.online) {
                            embed.color = 0x0088FF;
                            try {
                                embed.addField("Onlines", jso.players.online, true)
                            } catch (ex) { }
                            try {
                                if (jso.version)
                                    embed.addField("Versão(s)", jso.version, true)
                            } catch (ex) { }
                            try {
                                if (jso.plugins.raw)
                                    embed.addField("Plugins(s)", jso.plugins.raw.join(" "), true)
                            } catch (ex) { }
                            try {
                                if (jso.map)
                                    embed.addField("Mapa", jso.map, true)
                            } catch (ex) { }
                            try {
                                if (jso.ip)
                                    embed.addField("IP", jso.ip, true)
                            } catch (ex) { }
                            try {
                                if (jso.port)
                                    embed.addField("Porta", jso.port, true)
                            } catch (ex) { }
                            try {
                                if (jso.motd.clean)
                                    embed.addField("MOTD", jso.motd.clean, true)
                            } catch (ex) { }
                        } else {
                            embed.color = 0xFF0000;
                            embed.description = "Esse servidor não está online."
                        }
                        message.edit(embed)
                    })
                })
            })
        }
    }
    getPermission(): number {
        return null
    }
    getName(): string {
        return "serverstatus"
    }
    getAliases(): string[] {
        return ["serversts", "statuserver"]
    }

}