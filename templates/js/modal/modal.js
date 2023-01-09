const template = document.createElement('template');
template.innerHTML = `
<template id="modal-template">
    <style>
      /* Add some styles for the modal */
      .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
      }


  
      /* Modal content */
      .modal-content {
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 200px;
        position: relative;
        border-radius: 10px;
      }


  
      /* The close button */
      .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        position: absolute;
        left: 5px;
        top: 5px;
      }
  
      .close:hover,
      .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
      }
    </style>
    <div class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
      </div>
    </div>
  </template>

`;

export class Modal extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({mode: 'open'});
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._template = this._shadowRoot.getElementById('modal-template');
      this._shadowRoot.appendChild(this._template.content.cloneNode(true));
      this._modal = this._shadowRoot.querySelector('.modal');
      this._closeButton = this._shadowRoot.querySelector('.close');
      this._closeButton.addEventListener('click', () => {this.closeModal();});
      this._modal.addEventListener('click', (event) => {
        if (event.target ==  this._modal) this.closeModal();
      }
      );
    }


    openModal(){
      this._modal.style.display = 'block';
    }

    closeModal(){
      this._modal.style.display = 'none';
    }

  }

customElements.define('my-modal', Modal);