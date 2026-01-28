import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
    @Prop({ required: true })
    homePageHeader: string;

    @Prop({ required: true })
    homePageBody: string;

    @Prop({ required: true })
    homePageImage: string;

    @Prop({ type: [{ skill: String, image: String }], required: true })
    homePageSkills: { skill: String, image: String }[];

    @Prop({ type: [{ title: String, body: String, image: String, link: String, skills: [String] }], required: true })
    projects: { title: String, body: String, image: String, link: String, skills: [String] }[];

    @Prop({ type: String, required: true })
    aboutMe: String;

    @Prop({ type: { email: String, linkedinUrl: String, githubUrl: String }, required: true })
    contacts: { email: String, linkedinUrl: String, githubUrl: String };
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
