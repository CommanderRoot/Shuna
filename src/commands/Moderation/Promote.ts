import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            adminOnly: true,
            command: 'promote',
            description: 'promotes the mentioned users',
            category: 'moderation',
            usage: `${client.config.prefix}promote [@mention | tag]`,
            baseXp: 10
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
					return void M.reply(
						`π»ππ€ πππ πΌ ππππππ‘π π ππππππ π€ππ‘βππ’π‘ πππππ ππ πππππ?`
					);
				if (M.quoted?.sender) M.mentioned.push(M.quoted.sender);
				if (!M.mentioned.length)
					return void M.reply(
						`πππ π‘βπ π’π πππ  π¦ππ’ π€πππ‘ π‘π ${this.config.command}`
					);
        M.mentioned.forEach(async (user) => {
            const usr = this.client.contacts[user]
            const username = usr.notify || usr.vname || usr.name || user.split('@')[0]
            if (M.groupMetadata?.admins?.includes(user)) M.reply(`β πππππππ *${username}* ππ  π‘βππ¦'ππ πππππππ¦ ππ πππππ`)
            else {
                await this.client.groupMakeAdmin(M.from, [user])
                M.reply(`π πΊπππππππππππ π·πππππππ *${username}*`)
            }
        })
    }
}
