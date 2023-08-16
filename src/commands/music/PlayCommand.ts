import { Message, MessageEmbed } from "discord.js";
import MusicCommand from "../MusicCommand.js";

export default class PlayCommand implements MusicCommand {
    client: any;
    
    public isMusic = true;

    async execute(message: Message, args: string[]) {
        let player2 = this.client.music.players.get(message.guild.id);
        


            if (player2) {
                if (message.member.voice.channelID != message.guild.me.voice.channelID){
                    message.reply(`Você deve estar no mesmo canal de voz que eu.`)
                    return
                }
            }

            if (!message.member.voice.channel) {
                message.reply(`Você não está em nenhum canal de voz.`)
                return
            }
            const music = args.join(" ");

            if (!music) {
                message.reply(`Você deve inserir o nome da música/url.`)
                return
            }
            const result = await this.client.music.search(music, message.author)

            if (result.loadType === "LOAD_FAILED") {
                message.reply(`Não consegui tocar essa música.`)
                return
            }
            if (result.loadType === "NO_MATCHES") {
                message.reply(`Não encontrei nenhum resultado para essa pesquisa.`)
                return
            }

            const player = this.client.music.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id,
            });

            if (player.state === "DISCONNECTED") player.connect();

            if (result.loadType === "PLAYLIST_LOADED") {
                const playlist = result.playlist;

                for (const track of result.tracks) player.queue.add(track);

                if (!player.playing) player.play();

                const EMBED = new MessageEmbed()
                    .setTitle(`PlayList Adicionada`)
                    .addFields(
                        {
                            name: `Nome da playList`,
                            value: playlist?.name,
                            inline: false,
                        },
                        {
                            name: `Quantia de músicas`,
                            value: result.tracks.length,
                            inline: true,
                        },
                        {
                            name: `Duração`,
                            value: this.formatTime(
                                this.convertMilliseconds(result.playlist.duration),
                                "hh:mm:ss"
                            ),
                            inline: true,
                        }
                    );

                message.reply(EMBED);
            } else {
                const tracks = result.tracks;

                player.queue.add(tracks[0]);

                if (player2) {
                    message.reply(
                        `música **${tracks[0].title}** adicionada a PlayList.`
                    );
                }

                if (!player.playing) player.play();
            }
        
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
        return "play"
    }
    getAliases(): string[] {
        return ["p", "tocar"]
    }

}