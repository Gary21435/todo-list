export class Todo {
    constructor(title, dueDate, description, priority) {
        Object.assign(this, { title, dueDate, description, priority });
        this.complete = false;
    }
    
    toggle() {
        this.complete = !this.complete;
    }
}