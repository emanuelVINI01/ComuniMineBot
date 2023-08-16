import { Message, Permissions } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class LockCommand implements BaseCommand {
    execute(message: Message, args: string[]): void { 
        let channel = message.mentions.channels.first() || message.channel
        
    }
    getPermission(): number {
        return Permissions.FLAGS.ADMINISTRATOR
    }
    getName(): string {
        return "lock"
    }
    getAliases(): string[] {
        return ["bloquear", "travar"]
    }

}