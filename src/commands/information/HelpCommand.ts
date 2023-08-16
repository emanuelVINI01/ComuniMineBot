import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../BaseCommand.js";

export default class HelpCommand implements BaseCommand {
    execute(message: Message, args: string[]): void {
        let embed : MessageEmbed = new MessageEmbed();

        embed.color = 0x0088FF
        embed.title = "Central de Ajuda • ComuniMine"
        embed.description = `
        💰 | Economia:

        \`!daily\` ⇨ Pega seu money diários
        \`!money\` ⇨ Vê seu money atual
        \`!pay\` ⇨ Paga á alguém
        \`!work\` ⇨ Paga á alguém
        \`!topcoins\` ⇨ Vê o top coins
        \`!aposta\` ⇨ Aposta coins com alguém

        :notes: Música:

        \`!tocar\` ⇨ Toca uma música
        \`!pular\` ⇨ Pula uma música
        \`!tocandoagora\` ⇨ Mostra a música tocando agora
        \`!fila\` ⇨ Mostra a fila de músicas
        \`!pausar\` ⇨ Mostra a fila de músicas


        📦 | Informações:
        
        \`!ping\` ⇨ Veja o ping do bot
        \`!botinfo\` ⇨ Veja as informações do bot
        \`!online\` ⇨ Veja quantos jogadores estão conectados
        \`!serverinfo\` ⇨ Veja as informações do servidor
        \`!userinfo\` ⇨ Veja as informações de um usuário
        \`!avatar\` ⇨ Veja o avatar de algum usuário
        \`!serverstatus\` ⇨ Vê o status de um servidor
        \`!sugerir\` ⇨ Faça uma sugestão para o servidor
        \`!calc\` ⇨ Faz uma conta matématica
        \`!host\` ⇨ Mostra a melhor host para você iniciar o seu projeto
        \`!base64\` ⇨ Decodifica uma string base64
        \`!yt\` ⇨ Divulga um video (Deve ter tag criador de conteúdo)
        \`!infoip\` ⇨ Mostra as informações de um IP ou dominio
        
        🎉 | Diversão :
        
        \`!fight\` ⇨ Lute com amigos
        \`!gay\` ⇨ Veja quão gay é o seu amigo
        
        🗄 | Staff:
        
        \`!ban\` ⇨ De ban em alguem que infringiu as regras
        \`!clear\` ⇨ Limpe as mensagens do chat
        \`!kick\` ⇨ De kick em alguem que infrigiu as regras
        \`!say\` ⇨ Envie uma mensagem utilizando o bot
        \`!embed\` ⇨ Envie uma mensagem embed utilizando o bot
        \`!slowmode\` ⇨ Troca o slowmode do canal
        \`!lock\` ⇨ Bloqueia um canal
        \`!unlock\` ⇨ Desbloqueia um canal
        `
        message.reply(embed);
    }
    getPermission(): number {
        return null;
    }
    getName(): string {
        return "help";
    }
    getAliases(): string[] {
        return ["ajuda"]
    }

}