import $ from 'jquery';
var Dropdown = {
    bindActions: function () {
        var self = this;
        var $dropdown = $('.dropdown__head');
        $dropdown.unbind();
        $dropdown.on('click', function () {

            self.toggleContent($dropdown);

        });
    },
    toggleContent: function (element) {
        var $parent = element.closest('.dropdown');
        var $content = $parent.find('.dropdown__content');

        element.find('.fa-circle-o').toggle();
        element.find('.fa-check-circle').toggle();

        $content.toggle();
    }
};
export default Dropdown;