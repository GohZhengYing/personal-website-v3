import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ){}

async create({ email, password }: { email: string; password: string }) {
  return this.userModel.create({ email, password });
}

    findByEmail(email) {
return this.userModel.findOne({ email });
  }
}
