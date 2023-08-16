import { Message, Permissions, TextChannel } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class SlowmodeCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (args.length != 1) {
            message.reply("Use: !slowmode tempo")
        } else {
            let n = parseInt(args[0]);
            if (n != NaN) {
                if (n === (message.channel as TextChannel ).rateLimitPerUser) {
                    message.reply("Esse já é o slowmode do canal")
                    return;
                }
                if (n === 0) {
                    message.reply("Slowmode removido com sucesso")
                } else {
                    message.reply("Slowmode mudado com sucesso")
                }
                (message.channel as TextChannel ).setRateLimitPerUser(n)
            } else {
                message.reply("Slowmode inválido.")
            }
        }
    }
    getPermission(): number {
        return Permissions.FLAGS.MANAGE_CHANNELS;
    }
    getName(): string {
        return "slowmode"
    }
    getAliases(): string[] {
        return ["modelento", "cold"]
    }

}