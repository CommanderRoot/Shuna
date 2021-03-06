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
				caption: `šŗ ššššš šŗ\n\nšø ššš¬šš«š¢š©š­š¢šØš§: š šššš šš”šš­š¬šš©š© ššØš­ šš¢š­š” ššØš­š¬ šš  šš§š¢š¦š šššš­š®š«šš¬.\n\nš¹ ššØ ššš ššØš­ š­šØ š²šØš®š« š š«šØš®š© \n\n š ššØš§š­ššš­ šš°š§šš«: wa.me/+918075922832 \n`,
			}
		);
	};
}
