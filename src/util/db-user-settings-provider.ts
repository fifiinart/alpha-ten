import { User } from 'discord.js';
import { open, Database } from 'sqlite';
import { Database as SQLite3Database } from 'sqlite3';
import { join } from 'path';

interface UserSettingsEntry {
  embedColor: number;
}

const defaultEntry: UserSettingsEntry = {
  embedColor: 0x00ffff
}

export default async function openUserSettings(): Promise<UserSettingsProvider> {
  const db = await open({
    driver: SQLite3Database,
    filename: join(process.cwd(), 'database.db')
  })
  return new UserSettingsProvider(db);
}
class UserSettingsProvider {
  readonly db: Database
  constructor(db: Database) {
    this.db = db;
  }

  async close(): Promise<void> {
    await this.db.close();
  }

  async getUser(user: User): Promise<UserSettingsEntry> {
    const stringifiedObject = (await this.db.get("select settings from user_settings where user_id = ?", [user.id])).settings;
    return JSON.parse(stringifiedObject);
  }

  async setObject(user: User, object: Partial<UserSettingsEntry>): Promise<void> {
    await this.db.run(`insert into user_settings (user_id, settings) values (?, ?) on conflict(user_id) do update set settings=excluded.settings`, [user.id, JSON.stringify(Object.assign(defaultEntry, object))])
  }

  async set<K extends keyof UserSettingsEntry>(user: User, property: K, value: UserSettingsEntry[K]) {
    await this.setObject(user, {
      [property]: value
    })
  }

  async deleteUser(user: User) {
    await this.db.run("delete from user_settings where user_id = ?", user.id)
  }

  get = async <K extends keyof UserSettingsEntry>(user: User, key: K) => (await this.getUser(user))[key]
}