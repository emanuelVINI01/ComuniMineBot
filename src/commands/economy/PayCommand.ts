import { Message } from "discord.js";
import BaseCommand from "../BaseCommand";
import quickdb from 'quick.db'
export default class PayCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        if (args.length != 2) {
            message.reply("Use: !pay usuário quantia")
        } else {
            let mention = message.mentions.members.first();
            if(!mention) {
                message.reply("Não encontrei esse membro.")
            } else {
                let n = parseInt(args[1]);
                if (!n || n == NaN ) {
                    message.reply("Quantia inválida.")
                } else {
                    let money = quickdb.fetch(`money_${message.member.id}`)
                    if (money >= n) {
                        quickdb.subtract(`money_${message.member.id}`, n);
                        quickdb.add(`money_${mention.id}`, n);
                        message.reply(`Você pagou ${n} de money para <@${mention.id}>.`)
                    } else {
                        message.reply("Você não tem saldo suficiente.")
                    }
                }
            }
        }
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "pay";
    }
    getAliases(): string[] {
        return ["pagar", "pagamento"]
    }
    
}