$(document).ready(function() {
    const form = $('#dataForm');
    const tableBody = $('#tableBody');
    const successBanner = $('#successBanner');
    const responseBanner = $('#response');
    const microphone = document.querySelector(".microphone");
    const clearButton = $('.clear');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const words = {
        один: '1',
        два: '2',
        три: '3',
        четыре: '4',
        пять: '5',
        шесть: '6',
        семь: '7',
        восемь: '8',
        девять: '9',
        ноль: '0',
        точка: '.',
        минус: '-'
    };

    const recognition = new SpeechRecognition();
    recognition.lang = "ru-RU";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let rows = JSON.parse(localStorage.getItem("rows")) || [];
    rows.forEach(r => tableBody.append(r));

    microphone.addEventListener("click", () => {
        microphone.classList.toggle("active");
        if (microphone.classList.contains("active")) {
            recognition.start();
        }
    });

    function parseSpeech(speech) {
        const lower = speech.toLowerCase().replace(/[,!?;]/g, '');
        const wordsList = lower.split(/\s+/);
        const result = { selectedX: [], y: '', r: '' };
        let currentVar = null;
        const varKeywords = ['икс', 'x', 'игрик', 'y', 'эр', 'r'];

        for (let i = 0; i < wordsList.length; i++) {
            const w = wordsList[i];
            if (w === 'икс' || w === 'x') currentVar = 'x';
            else if (w === 'игрик' || w === 'y') currentVar = 'y';
            else if (w === 'эр' || w === 'r') currentVar = 'r';
            else if ((w === 'равно' || w === '=') && currentVar) {
                let valParts = [];
                i++;
                while (i < wordsList.length && !varKeywords.includes(wordsList[i])) {
                    valParts.push(wordsList[i]);
                    i++;
                }
                if (valParts.length > 0) {
                    const val = valParts.map(vw => words[vw] || vw).join('');
                    if (currentVar === 'x') result.selectedX.push(val);
                    else if (currentVar === 'y') result.y = val;
                    else if (currentVar === 'r') result.r = val;
                }
                currentVar = null;
                i--;
            }
        }

        return result;
    }

    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        console.log("Transcript:", transcript);
        //showResponseBanner("Transcript: " + transcript);

        const parsed = parseSpeech(transcript);
        console.log("Parsed:", parsed);
        //showResponseBanner("Parsed words: X=" + parsed.selectedX.join(",") + " Y=" + parsed.y + " R=" + parsed.r);

        if (!parsed.selectedX.length || !parsed.y || !parsed.r) {
            showResponseBanner("Invalid values");
            return;
        }

        sendData(parsed.selectedX, parsed.y, parsed.r);
    };

    function sendData(selectedX, y, r) {
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

        let requestsCount = selectedX.length;
        let completedRequests = 0;

        selectedX.forEach(x_value => {
            $.ajax({
                url: '/fcgi-bin/server.jar',
                method: 'POST',
                data: { X: x_value, Y: y, R: r },
                dataType: 'json',
                success: function(result) {
                    const row = `<tr>
                        <td>${result.R}</td>
                        <td>${result.X}</td>
                        <td>${result.Y}</td>
                        <td>${result.success}</td>
                        <td>${result.currentTime}</td>
                        <td>${result.workTime}</td>
                    </tr>`;
                    tableBody.append(row);
                    rows.push(row);
                    localStorage.setItem("rows", JSON.stringify(rows));

                    drawPoint(parseFloat(result.X), parseFloat(result.Y), parseFloat(result.R));

                    if (result.success) showSuccessBanner();
                },
                error: function(xhr, status, error) {
                    showResponseBanner("Sending error: " + (xhr.responseJSON?.reason || error || 'Server error'));
                },
                complete: function() {
                    completedRequests++;
                    if (completedRequests === requestsCount) {
                        button.prop('disabled', false).text(defaultText);
                    }
                }
            });
        });
    }

    form.submit(function(e) {
        e.preventDefault();
        if (!microphone.classList.contains("active")) {
            const selectedX = $('input[name="X"]:checked').map((_, el) => $(el).val()).get();
            const y = $('#Y').val();
            const r = $('#R').val();
            sendData(selectedX, y, r);
        }
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
        return y_val > -3 && y_val < 3;
    }

    function validation_X(X) {
        return ["-2","-1.5","-1","-0.5","0","0.5","1","1.5","2"].includes(X);
    }

    function validation_R(R) {
        return ["1","1.5","2","2.5","3"].includes(R);
    }

    clearButton.click(function() {
        localStorage.removeItem('rows');
        tableBody.empty();
    });
});