/** @format */

import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "broadcast",
			description:
				"Will make a broadcast for groups where the bot is in. Can be used to make announcements.",
			aliases: ["bcast", "announcement", "bc"],
			category: "dev",
			dm: true,
			usage: `${client.config.prefix}bc`,
			modsOnly: true,
			baseXp: 0,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined)
			return void (await M.reply(`πππππ π ππππ£πππ π‘βπ π΅πππππππ π‘ πππ π πππ.`));
		const term = joined.trim();
		const images = [
			"https://www.linkpicture.com/q/shuna_tensei_shitara_slime_datta_ken_by_dingier_dczw6qw.png",
			"https://www.linkpicture.com/q/shuna_slime_tensei_minimalist_wallpaper_by_erominimalistsensei_ded7f87.png",
			"https://www.linkpicture.com/q/shuna_wallpaper_by_flavio_ruru_ddqk14d.png",
		];
		const selected = images[Math.floor(Math.random() * images.length)];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const chats: any = this.client.chats
			.all()
			.filter((v) => !v.read_only && !v.archive)
			.map((v) => v.jid)
			.map((jids) => (jids.includes("g.us") ? jids : null))
			.filter((v) => v);
		for (let i = 0; i < chats.length; i++) {
			const text = `*πΈγ πππππ πππππππππ γπΈ*\n\n${term}\n\n Regards ~ *${M.sender.username}*`;
			this.client.sendMessage(chats[i], { url: selected }, MessageType.image, {
				caption: `${text}`,
				contextInfo: {
					mentionedJid: M.groupMetadata?.participants.map((user) => user.jid),
				},
			});
		}
		await M.reply(`π΅πππππππ π‘ πππ π πππ π πππ‘ π‘π *${chats.length} ππππ’ππ *.`);
	};
}
