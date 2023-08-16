import { Message, MessageEmbed } from "discord.js";
import MusicCommand from "../MusicCommand.js";

export default class TocandoAgora implements MusicCommand {
    client: any;
    public isMusic = true;
    execute(message: Message, args: string[]): any {
        const player = this.client.music.players.get(message.guild.id);

        if (!player)
          return message.reply(
            `${message.author}, não estou tocando música neste servidor.`
          );
    
        const track = player.queue.current;
    
        const EMBED = new MessageEmbed()
          .setAuthor(
            `${message.guild.name} - Tocando Agora`,
            message.guild.iconURL({ dynamic: true })
          )
          .setDescription(`Informações da Música que estou tocando agora`)
          .addFields(
            {
              name: `Nome:`,
              value: `**[${track.title}](${track.uri})**`,
            },
            {
              name: `Quem`,
              value: this.client.users.cache.get(track.requester.id).tag,
            },
            {
              name: `Duração`,
              value: `\`${this.msToHour(
                player.position
              )}\` **${this.progressBarEnhanced(
                player.position / 1000 / 50,
                track.duration / 1000 / 50,
                15
              )}** \`${this.msToHour(track.duration)}\``,
            }
          );
        //.setThumbnail(track.displayThumbnail("maxresdefault"))
    
        message.reply(EMBED);
      }
      msToHour(time) {
        time = Math.round(time / 1000);
        const s = time % 60,
          m = ~~((time / 60) % 60),
          h = ~~(time / 60 / 60);
    
        return h === 0
          ? `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
          : `${String(Math.abs(h) % 24).padStart(2, "0")}:${String(m).padStart(
              2,
              "0"
            )}:${String(s).padStart(2, "0")}`;
      }
      progressBarEnhanced(current, total, barSize) {
        const progress = Math.round((barSize * current) / total);
    
        return (
          "━".repeat(progress > 0 ? progress - 1 : progress) +
          "🔘" + //
          "━".repeat(barSize - progress)
        );
      }
    
    getPermission(): number {
        return null
    }
    getName(): string {
        return "tocandoagora"
    }
    getAliases(): string[] {
        return ["nowplaying", "tocandoagr"]
    }

}