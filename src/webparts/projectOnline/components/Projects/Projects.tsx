import * as React from 'react';
import styles from './Projects.module.scss';
import { IProjectsProps } from './IProjectsProps';
import { project, PublishedProject, ProjectCollection, User, CustomFieldCollection, Phase, ProjectSummaryTask, QueueJobCollection, Stage, PublishedAssignmentCollection, Calendar, DraftProject, PublishedProjectResourceCollection, PublishedTaskLinkCollection, PublishedTaskCollection, CommandResult, QueueJob } from "@pnp/project";
import { Button } from "office-ui-fabric-react/lib/Button";
import { TypedHash } from '@pnp/common';

export class Projects extends React.Component<IProjectsProps, {}> {

  private _projId: string = null;

  public render(): React.ReactElement<IProjectsProps> {
    return (
      <div className={styles.projects}>
        <Button text='Get all projects' onClick={this._getAllProjects}></Button>
        <Button text='Get project by Id' onClick={this._getProjectById}></Button>
        <Button text='Add project' onClick={this._addProject}></Button>
        <Button text='Update project' onClick={this._updateProject}></Button>
        <Button text='Submit Workflow' onClick={this._updateProjectWorkflow}></Button>
        <Button text='Delete project' onClick={this._deleteProject}></Button>
      </div>
    );
  }

  private _getAllProjects = async () => {
    const projects: ProjectCollection[] = await project.projects.get();
    console.log('Projects', projects);

  }

  private _addProject = async () => {
    const proj: CommandResult<PublishedProject> = await project.projects.add({
      Name: 'JR test ' + Date.now(),
      Description: 'Test project',
      EnterpriseProjectTypeId: '7ca316cc-b347-e711-80d1-00155d3c701a'
    });

    this._projId = proj.data.Id;
    console.log(proj);

  }

  private _getProjectById = async () => {

    const publishedProject: PublishedProject = await project.projects.getById(this._projId).get();
    console.log('Project', publishedProject);

    const user: User = await project.projects.getById(this._projId).checkedOutBy.get();
    console.log('Checked out by', user);

    const customFields: CustomFieldCollection[] = await project.projects.getById(this._projId).customFields.get();
    console.log('Custom Fields', customFields);

    const enterpriseProjectType: CustomFieldCollection = await project.projects.getById(this._projId).enterpriseProjectType.get();
    console.log('Enterprise Project Type', enterpriseProjectType);

    const phase: Phase = await project.projects.getById(this._projId).phase.get();
    console.log('Phase', phase);

    const projectSummaryTask: ProjectSummaryTask = await project.projects.getById(this._projId).projectSummaryTask.get();
    console.log('Project Summary Task', projectSummaryTask);

    const queueJobs: QueueJobCollection[] = await project.projects.getById(this._projId).queueJobs.get();
    console.log('Queue Jobs', queueJobs);

    const stage: Stage = await project.projects.getById(this._projId).stage.get();
    console.log('Stage', stage);

    const assignments: PublishedAssignmentCollection[] = await project.projects.getById(this._projId).assignments.get();
    console.log('Assignments', assignments);

    const calendar: Calendar = await project.projects.getById(this._projId).calendar.get();
    console.log('Calendar', calendar);

    const draft: DraftProject = await project.projects.getById(this._projId).draft.get();
    console.log('Draft', draft);

    const includeCustomFields: PublishedProject = await project.projects.getById(this._projId).includeCustomFields.get();
    console.log('Include Custom Fields', includeCustomFields);

    const owner: User = await project.projects.getById(this._projId).owner.get();
    console.log('Owner', owner);

    const projectResources: PublishedProjectResourceCollection[] = await project.projects.getById(this._projId).projectResources.get();
    console.log('Project Resources', projectResources);

    const taskLinks: PublishedTaskLinkCollection[] = await project.projects.getById(this._projId).taskLinks.get();
    console.log('Task Links', taskLinks);

    const tasks: PublishedTaskCollection[] = await project.projects.getById(this._projId).tasks.get();
    console.log('Tasks', tasks);
  }

  private _updateProject = async () => {
    // TODO: not working
    const checkedOutProject: CommandResult<DraftProject> = await project.projects.getById(this._projId).checkOut();
    console.log('CheckOut', checkedOutProject);

    const updateValue: TypedHash<string> = {
      'Description': 'Updated project ' + Date.now()
    };
    const update: CommandResult<QueueJob> = await checkedOutProject.instance.update(
      updateValue
    );
    console.log('Update', update);

    const publish: CommandResult<QueueJob> = await checkedOutProject.instance.publish(false);
    console.log('Publish', publish);

    const checkIn: CommandResult<QueueJob> = await checkedOutProject.instance.checkIn(true);
    console.log('Check In', checkIn);

  }

  private _updateProjectWorkflow = async () => {
    // TODO: not working
    const publishedProject: PublishedProject = await project.projects.getById(this._projId).get();
    console.log('Project', publishedProject);

    const submitToWorkflow: void = await project.projects.getById(this._projId).submitToWorkflow();
    console.log('Submit To Workflow', submitToWorkflow);
  }

  private _deleteProject = async () => {
    // TODO: not working
    const publishedProject: PublishedProject = await project.projects.getById(this._projId).get();
    console.log('Project', publishedProject);

    const deleteJob: CommandResult<QueueJob> = await publishedProject.delete();
    console.log('Delete', deleteJob);
  }

}
