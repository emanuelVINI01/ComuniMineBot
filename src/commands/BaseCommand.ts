import { Message } from "discord.js";

export default interface BaseCommand {


    execute(message : Message, args : Array<string>) : void;

    getPermission() : number;

    getName() : string;

    getAliases() : Array<string>;
    
    
}