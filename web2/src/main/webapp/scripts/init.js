$(document).ready(function() {
    const form = $('#dataForm');
    const tableBody = $('#tableBody');
    const successBanner = $('#successBanner');
    const responseBanner = $('#response');
    const clearButton = $('.clear');
    const area = document.getElementById("coordCanvas");

    area.addEventListener("click", function(event) {
            const r = $('input[name="R"]:checked').val();
            if (!r) {
                showResponseBanner("Select R first");
                return;
            }

            const rect = area.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const centerX = area.width / 2;
            const centerY = area.height / 2;
            const R = 160; //80

            const x = ((mouseX - centerX) / (R / r)).toFixed(2);
            const y = ((centerY - mouseY) / (R / r)).toFixed(2);

            $('#Y').val(y);
            $(`input[name="R"][value="${r}"]`).prop('checked', true);

            $('<input>').attr({
                type: 'hidden',
                name: 'X',
                value: x
            }).appendTo(form);

            form.submit();
        });

     document.getElementById('dataForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const r = $('input[name="R"]:checked').val();
        const y = $('#Y').val();
        const selectedX = $('input[name="X"]:checked').map((_, el) => $(el).val()).get();

        if (!selectedX.length || !y || !r) {
            showResponseBanner("Fill all fields");
            return;
        }
        if (!selectedX.every(validation_X)) {
            showResponseBanner("Invalid X value");
            return;
        }
        if (!validation_Y(y)) {
            showResponseBanner("Invalid Y value");
            return;
        }
        if (!validation_R(r)) {
            showResponseBanner("Invalid R value");
            return;
        }

        const button = form.find('button[type="submit"]');
        const defaultText = button.text();
        button.prop('disabled', true).text('Sending...');

        form.submit();
     });

    function showSuccessBanner() {
        successBanner.css('opacity', '1');
        setTimeout(() => successBanner.css('opacity', '0'), 3000);
    }

    function showResponseBanner(message) {
        responseBanner.html(message);
        responseBanner.css('opacity', 1);
        setTimeout(() => responseBanner.css('opacity', 0), 3000);
    }

    function validation_Y(Y) {
        const pattern = /^-?\d+(\.\d+)?$/;
        if (!pattern.test(Y)) return false;
        const y_val = parseFloat(Y);
        return y_val > -3 && y_val < 5;
    }

    function validation_X(X) {
        return ["-5","-4","-3","-2","-1","0","1","2","3"].includes(X);
    }

    function validation_R(R) {
        return ["1","2","3","4","5"].includes(R);
    }

    clearButton.click(function() {
        tableBody.empty();
    });
});
