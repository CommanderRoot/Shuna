/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import axios from "axios";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { MessageType, Mimetype } from "@adiwajshing/baileys";
import request from "../../lib/request";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "getgif",
			description: "Will give you random gif of the given search term.",
			category: "utils",
			usage: `${client.config.prefix}getgif [term]`,
			aliases: ["gif"],
			baseXp: 40,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!this.client.config.gifApi)
			return void M.reply("ππ πππ¦ π ππ‘ πππ π ππππβπππ ππππ . ");
		if (!joined) return void (await M.reply(`πππππ π ππππ£πππ ππ π π ππππβ π‘πππ!`));
		const search = joined.trim();
		const gif = await axios
			.get(
				`https://g.tenor.com/v1/search?q=${search}&key=${this.client.config.gifApi}&limit=100`
			)
			.catch(() => null);
		if (!gif)
			return void (await M.reply(`πΊππ πππ‘ πππ’ππ.`));
		const i = Math.floor(Math.random() * gif.data.results.length);
		const caption = "πΊ π―πππ...";
		return void M.reply(
			await request.buffer(gif.data.results[i].media[0].mp4.url),
			MessageType.video,
			Mimetype.gif,
			[caption],
			caption
		);
	};
}
