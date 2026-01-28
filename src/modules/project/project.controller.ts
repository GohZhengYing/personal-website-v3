import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from './project.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectsService: ProjectsService) {}

@Post()
@UseGuards(JwtAuthGuard)
create(@Req() req, @Body() body) {
  console.log('AUTH HEADER:', req.headers.authorization);
  console.log('USER:', req.user);
  return this.projectsService.create(body);
}


  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.projectsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }

}
