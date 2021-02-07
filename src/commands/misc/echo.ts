import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { TextChannel, Message, User, DMChannel } from 'discord.js';

export default class EchoCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'echo',
      memberName: 'echo',
      group: 'misc',
      description: 'Echos a message to someone else or some other channel.',
      args: [{
        key: "msg",
        type: "string",
        prompt: "What message would you like to send?"
      },
      {
        key: 'userOrChannel',
        type: 'user|channel',
        default: "NO_USER_OR_CHANNEL_PROVIDED" as const,
        prompt: ""
      }]
    })
  }

  async run(message: CommandoMessage, { msg, userOrChannel }: { msg: string, userOrChannel: User | TextChannel | "NO_USER_OR_CHANNEL_PROVIDED" }): Promise<Message> {
    if (userOrChannel === "NO_USER_OR_CHANNEL_PROVIDED") {
      return await message.say(`<@${message.author.id}> says, "${msg}"`,);
    } else if (userOrChannel instanceof User) {
      const dmChannel = await message.author.createDM();
      if (message.channel instanceof DMChannel) {
        return await dmChannel.send(`<@${message.author.id}> says, "${msg}"`);
      } else {
        return await dmChannel.send(`<@${message.author.id}> says, "${msg}" from <#${message.channel.id}>`);
      }
    } else {
      if (message.channel instanceof DMChannel) {
        return await userOrChannel.send(`<@${message.author.id}> says, "${msg}"`);
      } else {
        return await userOrChannel.send(`<@${message.author.id}> says, "${msg}" from <#${message.channel.id}>`);
      }
    }
  }
}