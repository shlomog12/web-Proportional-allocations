import  "./Sortable.min.js";


const style = `
*{
    text-align: center;
}


.dragable-item{
    cursor: pointer;
    width: 100px;
    margin: 12px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    text-align: center;
    background-color: white;
}

.wrapper{
    background-color: rgb(245 245 245);
    min-width: 50px;
    border-radius: 10px;
    padding: 5px;
    display:flex;
    flex-direction: column;
    margin: 10px;
}

.chosenClass{
    background-color: #c0bcbc;
}
`;


export class MultiSortable extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        this._title = document.createElement('div');
        this._title.textContent = 'כותרת';
        wrapper.appendChild(this._title);
        this._listItems = document.createElement('div');
        wrapper.appendChild(this._listItems);
        this._shadowRoot.appendChild(wrapper);
        const newStyle = document.createElement('style');
        newStyle.innerHTML = style;
        this._shadowRoot.appendChild(newStyle);
        new Sortable(this._listItems, {
            animation: 150,
            // ghostClass: 'blue-background-class',
            chosenClass: 'chosenClass'
        });
    }

    insertItems(mapOfNewItems){
        for (const [key, value] of Object.entries(mapOfNewItems)) {
            const element = document.createElement('div');
            element.setAttribute('id', key);
            element.textContent = value;
            element.classList.add('dragable-item');
            this._listItems.appendChild(element);
        }
    }

    get items(){
        return Array.from(this._listItems.childNodes);
    }

    getItemById(id){
        return this._shadowRoot.querySelector(`#${id}`);

    }
    set title(newTitle){
        this._title.textContent = newTitle;
    }

    get title(){
        return this._title.textContent;
    }


  }

customElements.define('sort-able', MultiSortable);