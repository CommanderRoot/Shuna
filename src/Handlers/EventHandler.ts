import { MessageType, WAParticipantAction } from '@adiwajshing/baileys'
import chalk from "chalk";
//import { evaluate } from "mathjs";
import WAClient from "../lib/WAClient";
import Canvas from "discord-canvas";
import ordinal from "ordinal";
export default class EventHandler {
	constructor(public client: WAClient) {}

	handle = async (event: IEvent): Promise<void> => {
		const group = await this.client.fetchGroupMetadataFromWA(event.jid);
		this.client.log(
			`${chalk.blueBright("EVENT")} ${chalk.green(
				`${this.client.util.capitalize(event.action)}[${
					event.participants.length
				}]`
			)} in ${chalk.cyanBright(group?.subject || "Group")}`
		);
		const data = await this.client.getGroupData(event.jid);
		if (!data.events) return void null;
		const user = event.participants[0];
		const contact = this.client.getContact(user);
		const username =
			contact.notify || contact.vname || contact.name || user.split("@")[0];
		let pfp: string;
		try {
			pfp = await this.client.getProfilePicture(user);
		} catch (err) {
			pfp =
				"https://www.linkpicture.com/q/pfp.jpg";
		}
		console.log(event.action);
		const groupData = await this.client.groupMetadata(event.jid);
		const memberCount = await ordinal(groupData.participants.length);
		const add = event.action === "add";
		const bye = event.action === "remove";
		const promote = event.action === "promote";
		const demote = event.action === "demote";
		/*const text = add
			? `- ${group.subject || "___"} -\n\n💠 *Group Description:*\n${
					group.desc
			  }\n\nHope you follow the rules and have fun!\n\n*‣ ${event.participants
					.map((jid) => `@${jid.split("@")[0]}`)
					.join(", ")}*`
			: event.action === "remove"
			? `Goodbye *@${
					event.participants[0].split("@")[0]
			  }* 👋🏻, we're probably not gonna miss you.`
			: `Ara Ara looks like *@${
					event.participants[0].split("@")[0]
			  }* got ${this.client.util.capitalize(event.action)}d${
					event.actor ? ` by *@${event.actor.split("@")[0]}*` : ""
			  }`;*/
		const contextInfo = {
			mentionedJid: event.actor
				? [...event.participants, event.actor]
				: event.participants,
		};
		if (add) {
			const welcome = await new Canvas.Welcome()
				.setUsername(username)
				.setDiscriminator(memberCount)
				.setMemberCount(memberCount)
				.setGuildName(group.subject)
				.setAvatar(pfp)
				.setColor("border", "#FF00FF")
				.setColor("username-box", "#FFFFFF")
				.setColor("discriminator-box", "#FFFFFF")
				.setColor("message-box", "#FFFFFF")
				.setColor("title", "#FFFFFF")
				.setColor("avatar", "#00FF00")
				.setText("member-count", `- ${memberCount} member !`)
				.setText("title", "hello")
				.setText("message", `welcome to ${group.subject}`)
				.setBackground("https://www.linkpicture.com/q/Wlcm-BG.jpg")
				.toAttachment();
			return void (await this.client.sendMessage(
				event.jid,
				welcome.toBuffer(),
				MessageType.image,
				{
					caption: `- ${group.subject || "___"} -\n\n💎 𝐆𝐫𝐨𝐮𝐩 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧:\n${
						group.desc
					}\n\n𝐇𝐨𝐩𝐞 𝐲𝐨𝐮 𝐟𝐨𝐥𝐥𝐨𝐰 𝐭𝐡𝐞 𝐫𝐮𝐥𝐞𝐬 𝐚𝐧𝐝 𝐡𝐚𝐯𝐞 𝐟𝐮𝐧!\n\n‣ ${event.participants
						.map((jid) => `@${jid.split("@")[0]}`)
						.join(", ")}`,
					contextInfo,
				}
			));
		}
		if (bye) {
			const goodbye = await new Canvas.Goodbye()
				.setUsername(username)
				.setDiscriminator(memberCount)
				.setMemberCount(memberCount)
				.setGuildName(group.subject)
				.setAvatar(pfp)
				.setColor("border", "#FF0000")
				.setColor("username-box", "#FF0000")
				.setColor("discriminator-box", "#FF0000")
				.setColor("message-box", "#FF0000")
				.setColor("title", "#FF0000")
				.setColor("avatar", "#FF0000")
				.setText("member-count", `- ${memberCount} member !`)
				.setText("message", `we're probably not gonna miss you`)
				.setBackground(
					"https://www.linkpicture.com/q/Goodbye-BG.jpg"
				)
				.toAttachment();
			return void (await this.client.sendMessage(
				event.jid,
				goodbye.toBuffer(),
				MessageType.image,
				{
					caption: `𝐒𝐚𝐲𝐨𝐧𝐚𝐫𝐚 @${
						event.participants[0].split("@")[0]
					} 👋🏻, 𝐰𝐞'𝐫𝐞 𝐩𝐫𝐨𝐛𝐚𝐛𝐥𝐲 𝐧𝐨𝐭 𝐠𝐨𝐧𝐧𝐚 𝐦𝐢𝐬𝐬 𝐲𝐨𝐮.`,
					contextInfo,
				}
			));
		}
		if (promote) {
			const text = `𝐂𝐨𝐧𝐠𝐫𝐚𝐭𝐮𝐥𝐚𝐭𝐢𝐨𝐧𝐬 @${
				event.participants[0].split("@")[0]
			}, 𝐲𝐨𝐮'𝐫𝐞 𝐧𝐨𝐰 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧.`;
			return void this.client.sendMessage(
				event.jid,
				text,
				MessageType.extendedText,
				{ contextInfo }
			);
		}
		if (demote) {
			const text = `𝐎𝐰𝐰 𝐥𝐨𝐨𝐤𝐬 𝐥𝐢𝐤𝐞 @${
				event.participants[0].split("@")[0]
			} 𝐠𝐨𝐭 𝐝𝐞𝐦𝐨𝐭𝐞𝐝.`;
			return void this.client.sendMessage(
				event.jid,
				text,
				MessageType.extendedText,
				{ contextInfo }
			);
		}
	};
}

interface IEvent {
    jid: string
    participants: string[]
    actor?: string | undefined
    action: WAParticipantAction
}
