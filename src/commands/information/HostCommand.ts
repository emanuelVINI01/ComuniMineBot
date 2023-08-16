import { Message } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class HostCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        message.reply(`
        <a:Minecraft:817438116758683649> **| Ryzen Hosting**

        *Você procura uma* **hospedagem** *para* **jogar com seus amigos** *ou até* **criar seu próprio servidor público?** *Não procure mais, entre na **Ryzen Hosting**, contamos com:*
        
        > **Hosts pagas OVH hospedadas nos EUA**
        > **Hosts grátis para bots**
        > **Host OVH grátis por invites**
        
        **Discord:** https://discord.gg/ZFj4bgEDmZ
        **Site:** https://ryzenhosting.com.br
        `)
    }
    getPermission(): number {
        return null
    }
    getName(): string {
        return "host"
    }
    getAliases(): string[] {
        return []
    }
    
}