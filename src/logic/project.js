export class Project {
    constructor(name) {
       Object.assign(this, { name }); 
       this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo); 
        // function to push in UI 
    }

    removeTodo(title) {
        const index = this.todos.indexOf(this.todos.find(obj => obj.title === title)); // remove todo by title
        this.todos.splice(index, 1);
    }

    giveTodos() {
        return [...this.todos];
    }
}