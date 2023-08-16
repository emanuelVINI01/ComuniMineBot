import { Message } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class PingCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        message.channel.send("Calculando...").then(msg => {
            msg.edit(`Ping: ${msg.createdTimestamp - message.createdTimestamp }ms`);
        })
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "ping"
    }
    getAliases(): string[] {
        return ["pingdobot"]
    }

}