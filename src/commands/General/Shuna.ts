/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "shuna",
			description: "Displays the info",
			category: "general",
			usage: `${client.config.prefix}shuna`,
			baseXp: 200,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		const shuna =
			"https://user-images.githubusercontent.com/97864273/156913350-6426b182-c65b-4971-b964-c8d1849f2c41.mp4";
		return void this.client.sendMessage(
			M.from,
			{ url: shuna },
			MessageType.video,
			{
				quoted: M.WAMessage,
				mimetype: Mimetype.gif,
				caption: `🌸 𝐒𝐇𝐔𝐍𝐀 🌸\n\n🌺「𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎」🌺\n\n💎 𝑺𝒀𝑵𝑩𝑬𝑬\n\n❄️ 𝐶𝑂𝑁𝑇𝐴𝐶𝑇: wa.me/+918075922832 \n`,
			}
		);
	};
}
