import * as React from 'react';
import styles from './Projects.module.scss';
import { IProjectsProps } from './IProjectsProps';
import { project, PublishedProject, ProjectCollection, User, CustomFieldCollection, Phase, ProjectSummaryTask, QueueJobCollection, Stage, PublishedAssignmentCollection, Calendar, DraftProject, PublishedProjectResourceCollection } from "@pnp/project";
import { Button } from "office-ui-fabric-react/lib/Button";

export class Projects extends React.Component<IProjectsProps, {}> {
  public render(): React.ReactElement<IProjectsProps> {
    return (
      <div className={styles.projects}>
        <Button text='Get all projects' onClick={this._getAllProjects}></Button>
        <Button text='Get project by Id' onClick={this._getProjectById}></Button>
        <Button text='Add project' onClick={this._addProject}></Button>
      </div>
    );
  }

  private _getAllProjects = async () => {
    const projects: ProjectCollection[] = await project.projects.get();
    console.log('Projects', projects);

  }

  private _getProjectById = async () => {

    const projId = '39e43597-6757-e711-80cb-00155d3c5016';

    const proj: PublishedProject = await project.projects.getById(projId).get();
    console.log('Project', proj);

    const user: User = await project.projects.getById(projId).checkedOutBy.get();
    console.log('Checked out by', user);

    const customFields: CustomFieldCollection[] = await project.projects.getById(projId).customFields.get();
    console.log('Custom Fields', customFields);

    const enterpriseProjectType: CustomFieldCollection = await project.projects.getById(projId).enterpriseProjectType.get();
    console.log('Enterprise Project Type', enterpriseProjectType);

    const phase: Phase = await project.projects.getById(projId).phase.get();
    console.log('Phase', phase);

    const projectSummaryTask: ProjectSummaryTask = await project.projects.getById(projId).projectSummaryTask.get();
    console.log('Project Summary Task', projectSummaryTask);

    const queueJobs: QueueJobCollection[] = await project.projects.getById(projId).queueJobs.get();
    console.log('Queue Jobs', queueJobs);

    const stage: Stage = await project.projects.getById(projId).stage.get();
    console.log('Stage', stage);

    const assignments: PublishedAssignmentCollection[] = await project.projects.getById(projId).assignments.get();
    console.log('Assignments', assignments);

    const calendar: Calendar = await project.projects.getById(projId).calendar.get();
    console.log('Calendar', calendar);

    const draft: DraftProject = await project.projects.getById(projId).draft.get();
    console.log('Draft', draft);

    const includeCustomFields: PublishedProject = await project.projects.getById(projId).includeCustomFields.get();
    console.log('Include Custom Fields', includeCustomFields);

    const owner: User = await project.projects.getById(projId).owner.get();
    console.log('Owner', owner);

    const projectResources: PublishedProjectResourceCollection[] = await project.projects.getById(projId).projectResources.get();
    console.log('Project Resources', projectResources);
  }

  private _addProject = async () => {
    const proj = await project.projects.add({
      Name: 'JR test ' + Date.now(),
      Description: 'Test project',
      EnterpriseProjectTypeId: '7ca316cc-b347-e711-80d1-00155d3c701a'
    });
    console.log(proj);
  }
}
