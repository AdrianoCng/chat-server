import { ObjectId } from 'mongoose';

type Status = 'online' | 'away';

interface MapValue {
  username: string;
  status: Status;
}

export default class StatusManager {
  private statusMap: Map<ObjectId, MapValue>;

  constructor() {
    this.statusMap = new Map();
  }

  setStatus(userId: ObjectId, status: MapValue) {
    this.statusMap.set(userId, status);
  }

  getStatus(userId: ObjectId) {
    return this.statusMap.get(userId);
  }

  removeStatus(userId: ObjectId) {
    this.statusMap.delete(userId);
  }

  getUsersStatus() {
    const users: { userId: ObjectId; username: string; status: Status }[] = [];

    this.statusMap.forEach((status, userId) => {
      users.push({ userId, ...status });
    });

    return users;
  }
}
