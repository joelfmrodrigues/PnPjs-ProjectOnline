import * as React from 'react';
import styles from './ProjectOnline.module.scss';
import { IProjectOnlineProps, IProjectOnlineState } from '.';
import { Projects } from "./../Projects/Projects";
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export class ProjectOnline extends React.Component<IProjectOnlineProps, IProjectOnlineState> {

  constructor(props: IProjectOnlineProps) {
    super(props);
    this.state = {
      projectId: ''
    };
  }

  public render(): React.ReactElement<IProjectOnlineProps> {
    return (
      <div className={styles.projectOnline}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to Project Online!</span>
              <p className={styles.subTitle}>Customize Project Online experiences using SPFx Web Parts.</p>

              <TextField label="Project Id" value={this.state.projectId} onChange={this._onChange} />

              <h3>Projects</h3>
              <Projects projectId={this.state.projectId}></Projects>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _onChange = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ projectId: newValue || '' });
  }

}
