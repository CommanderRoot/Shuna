import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'ban',
            description: 'Bans the tagged users globally',
            category: 'dev',
            usage: `${client.config.prefix}ban [@tag]`,
            modsOnly: true,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        const immortals = this.client.config.mods
            ? [M.sender.jid, this.client.user.jid, ...this.client.config.mods]
            : [M.sender.jid, this.client.user.jid]

        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        if (!M.mentioned.length || !M.mentioned[0]) return void M.reply('๐๐๐๐ก๐๐๐ ๐กโ๐ ๐ข๐ ๐๐ ๐คโ๐๐ ๐ฆ๐๐ข ๐ค๐๐๐ก ๐ก๐ ๐๐๐')
        let text = '*๐๐๐๐๐*\n\n'
        // declare tagged as (string | undefined) []
        // const tagged : (string | undefined)[] = []
        for (const user of M.mentioned) {
            if (immortals.includes(user)) {
                // tagged.push(user)
                text += `โด๏ธ @${user.split('@')[0]} ๐๐ ๐ ๐๐๐, ๐๐๐'๐ ๐๐ ๐๐๐๐๐๐\n`
                continue
            }
            const data = await this.client.getUser(user)
            // const info = this.client.getContact(user)
            // const username = info.notify || info.vname || info.name || user.split('@')[0]
            // const username = user.split('@')[0]
            if (data?.ban) {
                text += `๐ถ @${user.split('@')[0]}: ๐จ๐๐๐๐๐๐ ๐ฉ๐๐๐๐๐\n`
                continue
            }
            await this.client.blockUser(user);
            await this.client.banUser(user)
            text += `โฆ๏ธ @${user.split('@')[0]}: ๐ฉ๐๐๐๐๐\n`
        }
        await M.reply(
            `${text}`,
            undefined,
            undefined,
            // undefined
            [...M.mentioned, M.sender.jid]
        )
    }
}
