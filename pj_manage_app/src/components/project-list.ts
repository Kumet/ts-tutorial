/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {
    export class ProjectList extends Component<HTMLDivElement, HTMLElement>
        implements DragTarget {
        assignedProjects: Project[];

        constructor(private type: 'active' | 'finished') {
            super('project-list', 'app', false, `${type}-projects`)
            this.assignedProjects = [];
            this.configure()
            this.renderContent();
        }

        @autobind
        dragOverHandler(event: DragEvent) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEL = this.element.querySelector('ul')!;
                listEL.classList.add('droppable');
            }
        }

        @autobind
        dropHandler(event: DragEvent) {
            const prjId = event.dataTransfer!.getData('text/plain')
            projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
        }

        @autobind
        dragLeaveHandler(_: DragEvent) {
            const listEL = this.element.querySelector('ul')!;
            listEL.classList.remove('droppable');
        }


        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('drop', this.dropHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);

            projectState.addListener((projects: Project[]) => {
                const relevantProjects = projects.filter(pj => {
                    if (this.type === 'active') {
                        return pj.status === ProjectStatus.Active;
                    }
                    return pj.status === ProjectStatus.Finished;
                })
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            })
        }

        renderContent() {
            this.element.querySelector('ul')!.id = `${this.type}-projects-list`;
            this.element.querySelector('h2')!.textContent = this.type === 'active' ? '実行中プロジェクト' : '完了プロジェクト'
        }

        private renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
            listEl.innerHTML = '';
            for (const pjItem of this.assignedProjects) {
                new ProjectItem(listEl.id, pjItem);
            }
        }
    }

}