import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { MessageEmbed } from 'discord.js'
import openUserSettings from '../../util/db-user-settings-provider'

export default class BotInfoCommand extends Command {

  constructor(client: CommandoClient) {
    super(client, {
      name: 'bot-info',
      memberName: 'bot-info',
      group: 'info',
      description: 'Gives info about Alpha Ten.'
    });
  }

  async run(message: CommandoMessage): Promise<CommandoMessage> {
    const color = (await (await openUserSettings()).getUser(message.author)).embedColor;
    return await message.embed(new MessageEmbed({
      "title": "Alpha Ten Bot Info",
      "color": color,
      "timestamp": Date.now(),
      "footer": {
        "icon_url": message.author.avatarURL() ?? undefined,
        "text": message.author.username + '#' + message.author.discriminator
      },
      "thumbnail": {
        "url": message.client.user!.avatarURL() ?? undefined
      },
      "author": {
        "name": "Alpha Ten",
        "icon_url": message.client.user!.avatarURL() ?? undefined
      },
      "fields": [
        {
          "name": "TBA",
          "value": "TBA"
        }
      ]
    }));
  }
}