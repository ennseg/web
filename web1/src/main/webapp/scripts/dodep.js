$(document).ready(function() {
    const modal = $('#dodepModal');
    const btn = $('.dodep');
    const span = $('.close');

    btn.on('click', function() {
        modal.fadeIn(300);
    });

    span.on('click', function() {
        modal.fadeOut(300);
    });

    $(window).on('click', function(event) {
        if ($(event.target).is(modal)) {
            modal.fadeOut(300);
        }
    });
});
