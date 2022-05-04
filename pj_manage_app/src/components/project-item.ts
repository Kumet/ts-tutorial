/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {
    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
        implements Draggable {
        private project: Project

        get manday() {
            if (this.project.manday < 20) {
                return this.project.manday.toString() + '人日';
            } else {
                return (this.project.manday / 20).toString() + '人月';
            }
        }

        constructor(hostId: string, project: Project) {
            super('single-project', hostId, false, project.id);
            this.project = project
            this.configure()
            this.renderContent()
        }

        @autobind
        dragStartHandler(event: DragEvent) {
            event.dataTransfer!.setData('text/plain', this.project.id);
            event.dataTransfer!.effectAllowed = 'move';
        }

        dragEndHandler(_: DragEvent) {
        }

        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler)
        }

        renderContent() {
            this.element.querySelector('h2')!.textContent = this.project.title;
            this.element.querySelector('h3')!.textContent = this.manday;
            this.element.querySelector('p')!.textContent = this.project.description;
        }
    }
}