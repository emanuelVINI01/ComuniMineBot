import { Message, MessageEmbed } from "discord.js";
import MusicCommand from "../MusicCommand.js";

export default class FilaCommand implements MusicCommand {
    client: any;
    public isMusic = true;
    execute(message: Message, args: string[]): any {
        const player = this.client.music.players.get(message.guild.id);

        if (!player)
          return message.reply(
            `Não estou tocando música.`
          );
    
        const getSongDetails = (pos, pos2) => {
          const data = [];
    
          for (; pos <= pos2 && player.queue[pos]; pos++) {
            const requester = player.queue[pos].requester;
            data.push(
              `**${pos + 1}º** - [${this.shorten(player.queue[pos].title, 25)}](${
                player.queue[pos].uri
              }) [${requester}]`
            );
          }
          return data.join("\n");
        };
    
        const QUEUE = new MessageEmbed()
          .setDescription(
            `${
              player.queue.length <= 0
                ? `Nenhuma música na fila`
                : getSongDetails(0, 9)
            }\n\n> Tocando agora: **[${this.shorten(player.queue.current.title, undefined)}](${
              player.queue.current.uri
            })**\n> Duração da playlist: **${this.formatTime(
              this.convertMilliseconds(player.queue.duration),
              `hh:mm:ss`
            )}**`
          )
    
        message.reply(QUEUE);
      }
    
      shorten(text, size) {
        if (typeof text !== "string") return "";
        if (text.length <= size) return text;
        return text.substr(0, size).trim() + "...";
      }
      convertMilliseconds(ms) {
        const seconds = ~~(ms / 1000);
        const minutes = ~~(seconds / 60);
        const hours = ~~(minutes / 60);
    
        return { hours: hours % 24, minutes: minutes % 60, seconds: seconds % 60 };
      }
    
      formatTime(time, format, twoDigits = true) {
        const formats = {
          dd: "days",
          hh: "hours",
          mm: "minutes",
          ss: "seconds",
        };
    
        return format.replace(/dd|hh|mm|ss/g, (match) =>
          time[formats[match]].toString().padStart(twoDigits ? 2 : 0, "0")
        );
      }
    
    getPermission(): number {
        return null
    }
    getName(): string {
        return "fila"
    }
    getAliases(): string[] {
        return ["queue"]
    }

}