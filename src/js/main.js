import modals from './modules/modals';
import forms from './modules/forms';
import tabs from './modules/tabs';
import timer from './modules/timer';
import images from './modules/images';
import './slider';
import changeModalState from './modules/changeModalState';

window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let modalState = {};

    changeModalState(modalState);
    
    modals();

    forms(modalState);

    tabs('.glazing_block', '.glazing_content', '.glazing_slider', 'active');
    tabs('.no_click', '.decoration_content > div > div', '.decoration_slider', 'after_click');
    tabs('.balcon_icons_img',  '.big_img > img', '.balcon_icons', 'do_image_more', 'inline-block');

    timer('#timer', "2021-07-10");

    images();
});