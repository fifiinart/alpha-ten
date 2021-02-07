import { User, Message } from 'discord.js'
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

export default class GreetCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'greet',
      memberName: 'greet',
      aliases: ['hi', 'hello'],
      group: 'misc',
      description: 'Gives you a friendly little greeting or says hi to someone else!',
      details: 'Responds with "Hi, @Person!" if a user is not provided, or "@Person says hi to you, @Person!" if a user is provided.',
      examples: [`${client.commandPrefix}hello @DiscordUser#1234`, `${client.commandPrefix}hi`],
      args: [{
        key: 'user',
        type: 'user',
        default: "NO_USER_PROVIDED" as const,
        prompt: ""
      }]
    })
  }

  async run(message: CommandoMessage, { user }: { user: "NO_USER_PROVIDED" | User }): Promise<Message> {
    if (user === "NO_USER_PROVIDED") {
      return await message.reply(`Hello, <@${message.author.id}>!`)
    }
    return await message.reply(`<@${message.author.id}> says hi to you, <@${user.id}>!`)
  }
}