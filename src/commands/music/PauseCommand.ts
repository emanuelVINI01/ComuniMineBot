import { Message } from "discord.js";
import MusicCommand from "../MusicCommand.js";

export default class PauseCommand implements MusicCommand {
    client: any;
    public isMusic = true;
    execute(message: Message, args: string[]) {
        const player = this.client.music.players.get(message.guild.id);
        if (!player)
            return message.reply(
                `Não estou tocando música.`
            );
        if (
            !message.member.voice.channel ||
            message.member.voice.channel.id != message.guild.me.voice.channel.id
        ) {
            message.reply(
                `Você não está em um canal de voz/no mesmo canal que eu.`
            );
            return
        }
        if (message.member.voice.selfDeaf) {
            message.reply(
                `Você está com seu fone desativado portanto não é possível votar para pausar a música.`
            );
            return;
        }
        if (player.paused) {
            message.reply(`Música retomada com sucesso.`)
            player.pause(false)
        } else {
            player.pause(true)
            message.reply("Música pausada com sucesso.")
        }
    }
    getPermission(): number {
        return null
    }
    getName(): string {
        return "pause"
    }
    getAliases(): string[] {
        return ["pausar"]
    }

}