import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'disable',
            description: 'Disables the given command from being used globally',
            category: 'dev',
            dm: true,
            usage: `${client.config.prefix}config [command] | (reason)`,
            modsOnly: true,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        const split = joined.split('|')
        const key = split[0].toLowerCase().trim()
        if (!key) return void (await M.reply(`๐๐๐๐ฃ๐๐๐ ๐กโ๐ ๐๐๐๐๐๐๐ ๐ฆ๐๐ข ๐ค๐๐๐ก ๐ก๐ ๐๐๐ ๐๐๐๐`))
        const command = this.handler.commands.get(key) || this.handler.aliases.get(key)
        if (!command) return void (await M.reply(`๐๐ ๐๐๐๐๐๐๐ ๐๐๐ข๐๐`))
        if (await this.client.DB.disabledcommands.findOne({ command: command.config.command }))
            return void M.reply(`${command.config.command} ๐๐  ๐๐๐๐๐๐๐ฆ ๐๐๐ ๐๐๐๐๐`)
        await new this.client.DB.disabledcommands({
            command: command.config.command,
            reason: (split[1] || '').trim() || ''
        }).save()
        await M.reply(
            `*${this.client.util.capitalize(command.config.command)}* ๐๐  ๐๐๐ค ๐ท๐๐ ๐๐๐๐๐${
                split[1] ? ` for ${split[1]}` : ''
            }`
        )
    }
}
