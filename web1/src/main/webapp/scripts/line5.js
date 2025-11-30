$(document).ready(function() {
    const button = $("#lineButton5");
    const audio = document.getElementById('audio3');

    const img1 = "sources/line5/up.png";
    const img2 = "sources/line5/up_light.png";
    const img3 = "sources/line5/over.png";
    const img4 = "sources/line5/over_light.png";
    const img5 = "sources/line5/down.png";

    let isHovered = false;
    let isClicked = false;
    let id = 0;
    let interval;

    function startBlinking() {
        clearInterval(interval);
        interval = setInterval(() => {
            if (isClicked) return;

            if (isHovered) {
                button.attr("src", id % 2 === 0 ? img3 : img4);
            } else {
                button.attr("src", id % 2 === 0 ? img1 : img2);
            }
            id++;
        }, 300);
    }

    button.hover(
        function() {
            isHovered = true;
            id = 0;
            startBlinking();
        },
        function() {
            isHovered = false;
            id = 0;
            startBlinking();
        }
    );

    button.on("click", function() {
        isClicked = true;
        clearInterval(interval);
        button.attr("src", img5);
        audio.play();
        isClicked = false;
        startBlinking();
    });

    startBlinking();
});