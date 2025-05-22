export class Todo {
    constructor(title, dueDate, description, priority, id) {
        Object.assign(this, { title, dueDate, description, priority, id });
        this.complete = false;
    }
    
    toggle() {
        this.complete = !this.complete;
    }
}