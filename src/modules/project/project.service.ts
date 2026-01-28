// posts/posts.service.ts
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schema/project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<ProjectDocument>,
  ) {}

  create(data: Partial<Project>) {
    console.log(data)
    const project = new this.projectModel(data);
    return project.save();
  }

  findAll() {
    return this.projectModel.find().exec();
  }

  findOne(id: string) {
    return this.projectModel.findById(id).exec();
  }

  update(id: string, data: Partial<Project>) {
    return this.projectModel.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return this.projectModel.findByIdAndDelete(id);
  }
}
