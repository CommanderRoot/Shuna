import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'unban',
            description: 'Unban the tagged users globally',
            category: 'dev',
            usage: `${client.config.prefix}unban [@tag]`,
            modsOnly: true,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        if (!M.mentioned.length || !M.mentioned[0])
            return void M.reply('𝑷𝒍𝒆𝒂𝒔𝒆 𝒎𝒆𝒏𝒕𝒊𝒐𝒏 𝒕𝒉𝒆 𝒖𝒔𝒆𝒓 𝒘𝒉𝒐𝒎 𝒚𝒐𝒖 𝒘𝒂𝒏𝒕 𝒕𝒐 𝒖𝒏𝒃𝒂𝒏')
        let text = '*𝐒𝐓𝐀𝐓𝐄*\n\n'
        for (const user of M.mentioned) {
            const data = await this.client.getUser(user)
            // const info = this.client.getContact(user)
            // const username = info.notify || info.vname || info.name || user.split('@')[0]
            // const username = user.split('@')[0]
            if (!data?.ban) {
                text += `🔶 @${user.split('@')[0]}: 𝑁𝑜𝑡 𝐵𝑎𝑛𝑛𝑒𝑑\n`
                continue
            }
            await this.client.unbanUser(user)
            text += `✳️ @${user.split('@')[0]}: 𝑈𝑛𝑏𝑎𝑛𝑛𝑒𝑑\n`
        }
        // M.reply(text)
        await M.reply(
            `${text}`,
            undefined,
            undefined,
            // undefined
            [...M.mentioned, M.sender.jid]
        )
    }
}
