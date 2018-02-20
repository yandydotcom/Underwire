import $ from 'jquery';
import Core from './core/js/core';

var Underwire = {
    'init':function () {
        this.Core.bindComponents();
    },
    'Core': Core,
};

window.Underwire = Underwire;