import User, { Status } from '@models/User';
import { ObjectId } from 'mongoose';

export default class StatusManager {
  private userId: ObjectId;

  constructor(userId: ObjectId) {
    this.userId = userId;
  }

  async setStatus(status: Status) {
    try {
      await User.findByIdAndUpdate(this.userId, { status });
    } catch (error) {
      throw error;
    }
  }

  async getStatus() {
    try {
      const user = await User.findById(this.userId);

      return user?.status;
    } catch (error) {
      throw error;
    }
  }
}
