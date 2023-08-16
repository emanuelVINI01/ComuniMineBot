import { GuildMember, Message } from "discord.js";
import BaseCommand from "../BaseCommand.js";
import quickdb from 'quick.db'
import BotUtils from "../../BotUtils.js";
export default class ApostarCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (!quickdb.has(`money_${message.member.id}`)) {
            quickdb.set(`money_${message.member.id}`, 0)
        }
        let coins = quickdb.get(`money_${message.member.id}`)
        if (args.length != 2) {
            message.reply("Use: !apostar usuário quantia")
        } else {
            let m: GuildMember = message.guild.members.cache.get(args[0].replace("@", "").replace("!", "").replace("<", "").replace(">", ""));
            if (m !== undefined && m !== null) {
                let cod = parseInt(args[1])
                if (cod && cod != NaN) {
                    let useC = quickdb.get(`money_${m.id}`)
                    if (useC >= cod) {
                        if (coins >= cod) {
                            message.channel.send(`<@${m.id}> você aceita uma aposta de ${cod} coins de <@${message.author.id}>, clique abaixo.`).then(msg => {
                                try{ 
                                msg.react(msg.client.emojis.cache.get("883043557764632596"))
                                msg.react(msg.client.emojis.cache.get("883043510851346462"))
                                }catch(ex) {
                                    
                                }
                                msg.awaitReactions((reaction, user) => 
                                user.id == m.user.id 
                                && 
                                (reaction.emoji.id == "883043557764632596" || reaction.emoji.id == "883043510851346462")
                                ,
                                { max: 1, time: 60000 }).
                                then(collected => {
                                    if (collected.first().emoji.id == "883043557764632596") {
                                        let m: GuildMember = message.guild.members.cache.get(args[0].replace("@", "").replace("!", "").replace("<", "").replace(">", ""));
                                        if (m !== undefined && m !== null) {
                                            let cod = parseInt(args[1])
                                            if (cod && cod != NaN) {
                                                let useC = quickdb.get(`money_${m.id}`)
                                                if (useC >= cod) {
                                                    if (coins >= cod) {
                                                        msg.delete()
                                                        if ((BotUtils().getRandomBoolean() || message.member.id === "846801518874198056") && !(message.member.id !== "638452797574086667")) {
                                                            message.channel.send(`🏅 <@${message.author.id}> Venceu a aposta contra o <@${m.id}>`)
                                                            quickdb.subtract(`money_${m.id}`, cod)
                                                            quickdb.add(`money_${message.author.id}`, cod)
                                                        } else {
                                                            message.channel.send(`🏅 <@${m.id}> Venceu a aposta contra o <@${message.author.id}>`)
                                                            quickdb.subtract(`money_${message.author.id}`, cod)
                                                            quickdb.add(`money_${m.id}`, cod)
                                                        }
                                                    } else {
                                                        message.reply("Você não tem coins suficientes.")
                                                    }
                                                } else {
                                                    message.reply("Esse usuário não tem coins suficientes.")
                                                }

                                            } else {
                                                message.reply("Não entendi esse número.")
                                            }
                                        } else {
                                            message.reply("Não encontrei esse membro.")
                                        }
                                    }
                                    else {
                                        message.reply('Sua aposta foi negada.');
                                    }
                                }).catch(() => {
                                    msg.delete()
                                    message.reply('Nenhuma reação depois de 1 minuto, aposta cancelada.');
                                });
                            })
                        } else {
                            message.reply("Você não tem coins suficientes.")
                        }
                    } else {
                        message.reply("Esse usuário não tem coins suficientes;")
                    }

                } else {
                    message.reply("Não entendi esse número.")
                }
            } else {
                message.reply("Não encontrei esse membro.")
            }
        }
    }
    getPermission(): number {
        return null
    }
    getName(): string {
        return "apostar"
    }
    getAliases(): string[] {
        return ["coinflip", "aposta"]
    }

}