import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'invitelink',
            aliases: ['invite', 'linkgc'],
            description: 'Get the group invite link',
            category: 'general',
            usage: `${client.config.prefix}invite`,
            baseXp: 10
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        // check if Bot is the admin
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply(`๐ผ'๐ ๐๐๐ก ๐๐ ๐๐๐๐๐ ๐๐ ๐กโ๐๐  ๐๐๐๐ข๐.`)
        if ((await this.client.getGroupData(M.from)).invitelink) {
            const code = await this.client.groupInviteCode(M.from).catch(() => {
                return void M.reply('๐ถ๐๐ข๐๐ ๐๐๐ก ๐๐๐ก ๐กโ๐ ๐๐๐ฃ๐๐ก๐ ๐๐๐๐')
            })
            await this.client.sendMessage(
                M.sender.jid,
                `*Invite link:* https://chat.whatsapp.com/${code}`,
                MessageType.text
            )
            return void M.reply('๐บ๐๐๐ ๐๐๐ ๐๐๐ ๐ฎ๐๐๐๐ ๐ณ๐๐๐ ๐๐ ๐๐๐๐๐๐๐๐ ๐๐๐๐๐๐๐')
        } else {
            return void M.reply(
                `Command not enabled by the admin.\nUse *${this.client.config.prefix}act invitelink* to enable it`
            )
        }
    }
}
