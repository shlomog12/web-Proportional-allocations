import {Modal} from './modal.js';
const newStyle = `
.names{
    display: flex;
    flex-direction: column;
    width: 100px;
}

.names > input{
    margin: 5px 10px;
    border-radius: 5px;
}

.title-names{
    text-align: center;
    margin: 10px;
    font-size: larger;
    font-weight: bold;
    width: 100%;
}

.container-names{
    display: flex;
    justify-content: center;
}

.save-button{
    position: absolute;
    left: 5px;
    bottom: 5px;
}

`
class EditNamesModal extends Modal {
    constructor() {
      super();
      this._modalContent = this._shadowRoot.querySelector('.modal-content');
      this._containerNames = document.createElement('div');
      this._containerNames.classList.add('container-names');
      this._titleNames = document.createElement('div');
      this._titleNames.classList.add('title-names');
      this._inputsNames =document.createElement('div');
      this._inputsNames.classList.add('names');
      this._containerNames.appendChild(this._inputsNames);
      this._modalContent.appendChild(this._titleNames);
      this._modalContent.appendChild(this._containerNames);
      this.createSaveButton();

      this.extendStyle();
    }

    extendStyle(){
        const style = document.createElement('style');
        style.innerHTML = newStyle;
        this._shadowRoot.appendChild(style); 
        const styleButton = document.createElement('link');
        styleButton.setAttribute('rel','stylesheet');
        styleButton.href = './css/button.css';
        this._shadowRoot.appendChild(styleButton);
    }

    createSaveButton(){
        this._saveButton = document.createElement('button');
        this._saveButton.classList.add('save-button');
        this._saveButton.classList.add('button-30');
        this._saveButton.textContent = 'שמור';
        this._saveButton.addEventListener('click',()=>{
            this.dispatchEvent(new Event('saved'));
            this.closeModal();
        });
        this._modalContent.appendChild(this._saveButton);
    }

    set title(txtTitle){
        this._titleNames.textContent = txtTitle;
    }
    set typesInput(type){
        this._typeOfInputs = type;
    }

    set names(newNames){
        this._size = newNames.length;
        this._inputsNames.innerHTML ='';
        for (let index = 0; index < this._size; index++) {
            const elementName = document.createElement('input');
            elementName.value = newNames[index];
            elementName.setAttribute('id', `${this._typeOfInputs}_${index}`);  
            this._inputsNames.appendChild(elementName);
        }
    }

    get names(){
        const res = {};
        Array.from(this._inputsNames.children).forEach((item)=>{
            const key = item.getAttribute('id');
            const val = item.value;
            res[key] = val;
        });
        return res;
    }

  }

  customElements.define('edit-names-modal', EditNamesModal);