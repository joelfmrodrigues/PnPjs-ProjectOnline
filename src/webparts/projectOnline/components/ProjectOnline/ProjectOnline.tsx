import * as React from 'react';
import styles from './ProjectOnline.module.scss';
import { IProjectOnlineProps } from './IProjectOnlineProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { project } from "@pnp/project";
import { Projects } from "./../Projects/Projects";

export default class ProjectOnline extends React.Component<IProjectOnlineProps, {}> {
  public render(): React.ReactElement<IProjectOnlineProps> {
    return (
      <div className={styles.projectOnline}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to Project Online!</span>
              <p className={styles.subTitle}>Customize Project Online experiences using SPFx Web Parts.</p>

              <h3>Projects</h3>
              <Projects></Projects>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
