import dotenv from "dotenv";
import Commando from "discord.js-commando";
import config from "./config";
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import { join } from 'path';
import date from 'date-and-time';

dotenv.config();

const client = new Commando.Client({
  commandPrefix: config.prefix,
  owner: config.owner,
});

client.setProvider(
  sqlite.open({ filename: 'database.db', driver: sqlite3.Database })
    .then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.registry
  .registerDefaults()
  .registerGroups([
    ["util", "Utility"],
    ["misc", "Miscellaneous"],
    ["info", "Information"]
  ])
  .registerCommandsIn(join(__dirname, "commands"));
client.once("ready", async () => {
  console.log(`Alpha Ten started up on ${date.format(new Date(), "MMM DD YY at hh:mm:ss")}.`);
});
client.login(process.env.TOKEN);