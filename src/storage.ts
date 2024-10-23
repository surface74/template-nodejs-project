import { ServerError } from './util/error';
import User from './types/user.types';
import { v4 as getUUID } from 'uuid';

export default class Storage {
  private records: User[];

  public constructor() {
    this.records = new Array<User>();
  }

  public createRecord(newUser: User): User {
    try {
      const user: User = { ...newUser, id: getUUID() };
      this.records.push(user);
      return user;
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      throw new ServerError(message);
    }
  }

  public async getAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      try {
        resolve([...this.records]);
      } catch (error) {
        const message = error instanceof Error ? error.message : '';
        reject(new ServerError(message));
      }
    });
  }

  public getRecord(uuid: string): User | undefined {
    return this.records.find((user) => user.id === uuid);
  }

  public updateRecord(userData: User): User | undefined {
    const user = this.records.find((user: User): boolean => user.id === userData.id);
    if (!user) return;
    user.username = userData.username;
    user.age = userData.age;
    user.hobbies = userData.hobbies;
    return user;
  }

  public deleteRecord(uuid: string): boolean {
    const index = this.records.findIndex((user: User): boolean => user.id === uuid);
    if (index === -1) {
      return false;
    }
    this.records.splice(index, 1);
    return true;
  }
}
