import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import YT from "../../lib/YT";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "ytvideo",
      description: "Downloads given YT Video",
      category: "media",
      aliases: ["ytv"],
      usage: `${client.config.prefix}ytv [URL]`,
      baseXp: 10,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    if (!M.urls.length)
      return void M.reply(
        "π ππππ£πππ π‘βπ πππΏ ππ π‘βπ ππ π£ππππ π¦ππ’ π€πππ‘ π‘π πππ€πππππ"
      );
    const video = new YT(M.urls[0], "video");
    if (!video.validateURL()) return void M.reply(`Provide a Valid YT URL`);
    const { videoDetails } = await video.getInfo();
    if (Number(videoDetails.lengthSeconds) > 1800)
      return void M.reply("β πΆπππππ‘ πππ€πππππ π£πππππ  ππππππ π‘βππ 30 ππππ’π‘ππ ");
    M.reply(await video.getBuffer(), MessageType.video).catch((reason: Error) =>
      M.reply(`β An error occurred, Reason: ${reason}`)
    );
  };
}
