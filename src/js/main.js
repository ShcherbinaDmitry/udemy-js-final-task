import modal from './modules/modal';
import forms from './modules/forms';
// import {getData, postData} from './services/service';

window.addEventListener('DOMContentLoaded', function() {
    modal('.popup_engineer_btn', '.popup_engineer');
    modal('.phone_link', '.popup');
    forms('form');

});