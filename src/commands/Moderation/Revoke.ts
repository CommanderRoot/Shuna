/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			adminOnly: true,
			command: "revoke",
			description: "Revokes the group link.",
			category: "moderation",
			usage: `${client.config.prefix}revoke`,
			baseXp: 0,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
			return void M.reply(
				"๐ป๐๐ค ๐๐๐ ๐ผ ๐๐๐ฃ๐๐๐ ๐กโ๐ ๐๐๐๐ข๐ ๐๐๐๐ ๐ค๐๐กโ๐๐ข๐ก ๐๐๐๐๐ ๐๐ ๐๐๐๐๐?"
			);
		await this.client.revokeInvite(M.from).catch(() => {
			return void M.reply("๐๐๐ข๐ฅ๐๐ ๐ญ๐จ ๐ซ๐๐ฏ๐จ๐ค๐ ๐ญ๐ก๐ ๐ ๐ซ๐จ๐ฎ๐ฉ ๐ฅ๐ข๐ง๐ค");
		});
		return void M.reply("๐๐ซ๐จ๐ฎ๐ฉ ๐ฅ๐ข๐ง๐ค ๐ซ๐๐ฏ๐จ๐ค๐๐");
	};
}
