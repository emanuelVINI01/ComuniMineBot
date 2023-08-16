import { Message, Permissions, TextChannel } from 'discord.js';
import BaseCommand from '../BaseCommand.js'

export default class ClearCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (args.length != 1) {
            message.reply("Use: !"+this.getName()+" <quantia>.")
        } else {
            let messagecount : number = parseInt(args[0]);
            if (messagecount === NaN) {
                message.reply("Não entendi esse número.")
            }
            if( messagecount > 100 ) {
                message.reply("Só posso limpar até 100 mensagens.")
            }
            (message.channel as TextChannel).bulkDelete(messagecount);
            message.reply(`O chat teve ${messagecount} mensagens removidas por <@${message.author.id}>`)
        }
    }

    getPermission(): number {
        return Permissions.FLAGS.ADMINISTRATOR;
    }
    getName(): string {
        return "clear";
    }
    getAliases(): string[] {
        return ["limpar", "apagar"];
    }

}