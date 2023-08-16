import { Message, MessageEmbed } from "discord.js";
import MusicCommand from "../MusicCommand.js";
let array = []
export default class SkipCommand implements MusicCommand {
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
        `Você está com seu fone desativado portanto não é possível votar para pular a música.`
      );
      return;
      }
    let requiredVotes =
      message.guild.me.voice.channel.members.filter(
        (x) => !x.user.bot && !x.voice.selfDeaf
      ).size ;
    if (message.member.permissions.has("ADMINISTRATOR")) {
        requiredVotes = 0
        message.reply("Você é um administrador, logo pulou a música automáticamente.")
    }
    if (array.some((x) => x === message.author.id)) return;
    array.push(message.author.id);

    if (array.length >= requiredVotes) {
      player.stop();

      message.reply(`Música pulada com sucesso.`);
      return (array = []);
    }

    message.reply(
      `Pular a Música? **( ${array.length}/${requiredVotes} )**.`
    );
    }
    getPermission(): number {
        return null
    }
    getName(): string {
        return "skip"
    }
    getAliases(): string[] {
        return ["pular", "next"]
    }

}