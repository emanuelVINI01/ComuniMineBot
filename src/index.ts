const start: Date = new Date()
import { Manager } from "erela.js";
import { Client, Guild, MessageEmbed, TextChannel } from "discord.js";
import MusicCommand from "./commands/MusicCommand.js";
import BaseCommand from "./commands/BaseCommand.js";
import ClearCommand from "./commands/admin/ClearCommand.js";
import EmbedCommand from "./commands/admin/EmbedCommand.js";
import BanCommand from "./commands/moderation/BanCommand.js";
import UserInfoCommand from "./commands/information/UserInfoCommand.js";
import ServerInfoCommand from "./commands/information/ServerInfoCommand.js";
import HelpCommand from "./commands/information/HelpCommand.js";
import FightCommand from "./commands/diversion/FightCommand.js";
import TapaCommand from "./commands/diversion/TapaCommand.js";
import GayCommand from "./commands/diversion/GayCommand.js";
import OnlineCommand from "./commands/information/OnlineCommand.js";
import KickCommand from "./commands/moderation/KickCommand.js";
import PingCommand from "./commands/information/PingCommand.js";
import SayCommand from "./commands/admin/SayCommand.js";
import AvatarCommand from "./commands/util/AvatarCommand.js";
import BotInfoCommand from "./commands/information/BotInfoCommand.js";
import SkipCommand from "./commands/music/SkipCommand.js";
import DailyCommand from "./commands/economy/DailyCommad.js";
import MoneyCommand from "./commands/economy/MoneyCommand.js";
import CalcCommand from "./commands/util/CalcCommand.js";
import SlowmodeCommand from "./commands/admin/SlowmodeCommand.js";
import PayCommand from "./commands/economy/PayCommand.js";
import WorkCommand from "./commands/economy/WorkCommand.js";
import EvalCommand from "./commands/admin/EvalCommand.js";
import ServerStatusCommands from "./commands/util/ServerStatusCommands.js";
import SugerirCommand from "./commands/util/SuguerirCommand.js";
import Base64Command from "./commands/util/Base64Command.js";
import HostCommand from "./commands/information/HostCommand.js";
import TocandoAgora from "./commands/music/TocandoAgora.js";
import TopCoinsCommand from "./commands/economy/TopCoinsCommand.js";
import ApostarCommand from "./commands/economy/ApostarCommand.js";
import YTCommand from "./commands/util/YTCommand.js";
import PauseCommand from "./commands/music/PauseCommand.js";
import PlayCommand from "./commands/music/PlayCommand.js";
import InfoIP from "./commands/util/InfoIP.js";
import FilaCommand from "./commands/music/FilaCommand.js";
const token: string = "";
let commands: Array<BaseCommand> = new Array<BaseCommand>();
commands.push(new ClearCommand())
commands.push(new SayCommand());
commands.push(new PauseCommand())
commands.push(new BanCommand());
commands.push(new EmbedCommand())
commands.push(new UserInfoCommand());
commands.push(new HelpCommand());
commands.push(new FightCommand());
commands.push(new ServerInfoCommand());
commands.push(new TapaCommand());
commands.push(new GayCommand());
commands.push(new OnlineCommand());
commands.push(new KickCommand());
commands.push(new AvatarCommand());
commands.push(new Base64Command());
commands.push(new FilaCommand());
commands.push(new TocandoAgora());
commands.push(new HostCommand());
commands.push(new BotInfoCommand());
commands.push(new PingCommand());
commands.push(new DailyCommand());
commands.push(new SkipCommand());
commands.push(new MoneyCommand());
commands.push(new CalcCommand());
commands.push(new PayCommand());
commands.push(new WorkCommand());
commands.push(new PlayCommand());
commands.push(new SlowmodeCommand());
commands.push(new ServerStatusCommands());
commands.push(new EvalCommand());
commands.push(new YTCommand());
commands.push(new SugerirCommand());
commands.push(new ApostarCommand());
commands.push(new TopCoinsCommand());
commands.push(new InfoIP());
class ComuClient extends Client {
    public music : any;
}
let client : any = new ComuClient();
let quad = 0;
let allowChannels = ["879451967267692614", "859125990651592715", "880067811534315552", "863145814565978133"]
let status = ["Atualmente com %members membros na ComuniMine!", "Online há %time!"]
client.on("message", msg => {
    try{
    if (msg.member != null) {
        if (msg.channel.id === "817424614719881237" || msg.member.roles.cache.has("859753583720661012")) {
            if (msg.content.startsWith("!")) {
                let toExec: BaseCommand = null;
                let args: Array<string> = msg.content.split(" ")
                let com = args[0].replace("!", "")
                args.splice(0, 1);
                commands.forEach(command => {
                    if (com.toUpperCase() == command.getName().toUpperCase()) {
                        toExec = command;
                    } else {
                        command.getAliases().forEach(each => {
                            if (each.toUpperCase() == com.toUpperCase()) {
                                toExec = command;
                            }
                        })
                    }
                });
                if (toExec == null) {
                    msg.reply("Comando não encontrado.")
                } else {
                    if(msg.member.id !== "638452797574086667" || true) {
                    if (toExec instanceof BotInfoCommand) {
                        (toExec as BotInfoCommand).commandNumber = commands.length
                    }
                    if (!(toExec as any).isMusic !== undefined ) {
                        (toExec as MusicCommand).client = client
                    }
                    if (toExec.getPermission() == null) {
                        toExec.execute(msg, args);
                    } else {
                        if (msg.member.permissions.has(toExec.getPermission()) || msg.member.permissions.has("ADMINISTRATOR") || msg.member.id === "846801518874198056") {
                            toExec.execute(msg, args);
                        } else {
                            msg.reply("Você não tem permissão para isso!")
                        }
                    }
                }else {
                    msg.reply("Ops! Houve um erro ao executar comando: "+ "Usuário banido do bot")
                }

                }
            }
        }
    };
}catch(ex) {
    msg.reply(`Erro ao executar comando, o erro já foi enviado ao emanuelVINI é deve ser corrigido.`)
    msg.guild.members.cache.get("846801518874198056").send("Houve um erro ao executar um comando. Erro:\n "+ex)
}
});
client.on("messageUpdate", (a, msg) => {
    try {
        if (msg.member.id != client.user.id) {
            if ((msg.content.includes("discord.gg") || msg.content.includes("invite.gg")) && !allowChannels.includes(msg.channel.id) && !msg.member.permissions.has("ADMINISTRATOR")) {
                msg.delete()
            }
            let embed: MessageEmbed = new MessageEmbed()
            embed.title = "<:confirmar:883043557764632596> Mensagem alterada"
            embed.color = 0xfbff00
            embed.addField("Canal", `<#${msg.channel.id}>`, false);
            embed.addField("Autor", `<@${msg.member.id}>`, false);
            embed.addField("Mensagem anterior", a.content, false);
            embed.addField("Mensagem nova", msg.content, false);
            (msg.guild.channels.cache.get("817428958563139584") as TextChannel).send(embed)
        }
    } catch (ex) {

    }
})
client.on("message", (msg) => {
    if (msg.member.id != client.user.id) {
        if ((msg.content.includes("discord.gg") || msg.content.includes("invite.gg")) && !allowChannels.includes(msg.channel.id) && !msg.member.permissions.has("ADMINISTRATOR")) {
            msg.delete()
        }
    }
})
client.on("messageDelete", msg => {
    try {
        let embed: MessageEmbed = new MessageEmbed()
        embed.title = "<:negar:883043510851346462> Mensagem deletada"
        embed.color = 0xff0000
        embed.addField("Canal", `<#${msg.channel.id}>`, false);
        embed.addField("Autor", `<@${msg.member.id}>`, false);
        embed.addField("Mensagem", msg.content, false);
        (msg.guild.channels.cache.get("817428958563139584") as TextChannel).send(embed)
    } catch (ex) {

    }
})
client.on("ready", () => {
    console.log("Bot ligado com sucesso!");
    setInterval(() => {


        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let st = `${days != 0 ? days + " dias é " : ""}${hours != 0 ? hours + " horas é " : ""}${minutes != 0 ? minutes + " minutos é " : ""}${seconds != 1 ? seconds + " segundos" : ""}`
        client.user.setActivity(status[quad].replace("%members", `${client.guilds.cache.array()[0].memberCount}`).replace("%time", st));
        quad++;
        if (quad >= status.length) {
            quad = 0;
        }
    }, 5000);
    client.music.init(client.user.id)
})
client.on("guildMemberAdd", add => {
    let role = add.guild.roles.cache.get("817429237509914645")
    add.roles.add(role)
    if (client.channels.cache.get("817428430320566273") instanceof TextChannel) {
        let embed: MessageEmbed = new MessageEmbed();

        embed.color = 0x0088FF;
        embed.description = `O usuário <@${add.id}> (${add.id}) entrou no servidor.`;
        (client.channels.cache.get("817428430320566273") as TextChannel).send(embed);
    }
})
client.on("guildMemberRemove", add => {
    if (client.channels.cache.get("817427251179946014") instanceof TextChannel) {
        let embed: MessageEmbed = new MessageEmbed();

        embed.color = 0xFF0000;
        embed.description = `O usuário ${add.user.tag} [${add.id}] saiu do servidor.`;
        (client.channels.cache.get("817427251179946014") as TextChannel).send(embed);
    }
})

const nodes = [
    {
        identifier: "Node 1",
        host: "us1.ryzenhosting.com.br",
        port: 4025,
        password: "testando",
        retryAmount: 30,
        retryDelay: 3000,
        secure: false,
    }
];
client.LavaLinkPing = new Map();
client.music = new Manager({
    nodes,
    send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
})
    .on("nodeConnect", (node: any) => {
        console.log(console.log(`[LavaLink] - ${node.options.identifier} conectado.`));
        
    })
client.music.on("nodeReconnect", (node, error) => {
    console.log(
        `[LavaLink] - Reconectando no Node ${node.options.identifier}`
    );
})
    .on("nodeError", (node, error) => {
        console.log(
            console.log(
                `[LavaLink] - Erro ao concetar no Node ${node.options.identifier} | ERRO: ${error.message}`
            )
        );
        if (error.message.startsWith("Unable to connect after"))
            client.music.reconnect();
    })
client.music.on("trackStart", async (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);
    if (player.lastPlayingMsgID) {
        const msg = channel.messages.cache.get(player.lastPlayingMsgID);
        if (msg) msg.delete();
    }
    player.lastPlayingMsgID = await channel
        .send(`Começei a tocar: **${track.title}**`)
        .then((x) => x.id);
})
client.music.on("queueEnd", async (player) => {
    let channel = (client.channels.cache.get(player.textChannel) as TextChannel)
    channel.guild.me.voice.channel.leave()
    client.music.players.delete(player.guild)
    client.channels.cache
        .get(player.textChannel)
        .send(
            `A lista com músicas acabou.`
        );
});
client.on("raw", (x) => client.music.updateVoiceState(x));
client.login(token);
