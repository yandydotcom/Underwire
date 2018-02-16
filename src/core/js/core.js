import $ from 'jquery';
import Components from './components/components-all';

var Core = {
    bindComponents: function () {
      $.each(Components, function () {
         this.bindActions();
      });
    },
    'Components': Components,
};

export default Core;