<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fn" uri="jakarta.tags.functions" %>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>777</title>
    <link href="${pageContext.request.contextPath}/css/style.css" rel="stylesheet" type="text/css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body>
<video class="video-background" autoplay muted loop>
    <source src="${pageContext.request.contextPath}/sources/video_background.mp4" type="video/mp4">
</video>
<div class="main">
    <header class="banner">
        <h1>Соболев Егор Викторович P3209 467530</h1>
    </header>
    <div class="banner table">
        <table>
            <thead>
            <tr>
                <th>R</th>
                <th>X</th>
                <th>Y</th>
                <th>success</th>
            </tr>
            </thead>
            <tbody id="tableBody">
                    <c:if test="${not empty bean.x}">
                        <c:forEach var="x" items="${bean.x}" varStatus="status">
                            <tr>
                                <td>${bean.r[status.index]}</td>
                                <td>${x}</td>
                                <td>${bean.y[status.index]}</td>
                                <td>${bean.success[status.index]}</td>
                            </tr>
                        </c:forEach>
                    </c:if>
            </tbody>
        </table>
    </div>
    <div class="banner coord_sys">
        <canvas id="coordCanvas" width="400" height="400"></canvas>
    </div>

    <form id="dataForm" class="banner data_input" method="get" action="${pageContext.request.contextPath}/AreaCheck">
        <input type="hidden" id="hiddenX">
        <label class="custom-checkbox">изменение X:
            <input type="checkbox" name="X" value="-5">
            <span class="checkmark"></span>
            <span class="checkbox-text">-5</span>
        </label>
        <label class="custom-checkbox">
            <input type="checkbox" name="X" value="-4">
            <span class="checkmark"></span>
            <span class="checkbox-text">-4</span>
        </label>
        <label class="custom-checkbox">
            <input type="checkbox" name="X" value="-3">
            <span class="checkmark"></span>
            <span class="checkbox-text">-3</span>
        </label>
        <label class="custom-checkbox">
            <input type="checkbox" name="X" value="-2">
            <span class="checkmark"></span>
            <span class="checkbox-text">-2</span>
        </label>
        <label class="custom-checkbox">
            <input type="checkbox" name="X" value="-1">
            <span class="checkmark"></span>
            <span class="checkbox-text">-1</span>
        </label>
        <label class="custom-checkbox">
            <input type="checkbox" name="X" value="0">
            <span class="checkmark"></span>
            <span class="checkbox-text">0</span>
        </label>
        <label class="custom-checkbox">
            <input type="checkbox" name="X" value="1">
            <span class="checkmark"></span>
            <span class="checkbox-text">1</span>
        </label>
        <label class="custom-checkbox">
            <input type="checkbox" name="X" value="2">
            <span class="checkmark"></span>
            <span class="checkbox-text">2</span>
        </label>
        <label class="custom-checkbox">
            <input type="checkbox" name="X" value="3">
            <span class="checkmark"></span>
            <span class="checkbox-text">3</span>
        </label>

        <div style="margin-top: 10px;">
            <label for="Y">изменение Y:</label>
            <input type="text" id="Y" name="Y" placeholder="Введите значение -3 < Y < 5">
        </div>

        <div style="margin-top: 10px;">
            <label class="custom-checkbox">изменение R:
                <input type="radio" name="R" value="1">
                <span class="checkmark"></span>
                <span class="checkbox-text">1</span>
            </label>
            <label class="custom-checkbox">
                <input type="radio" name="R" value="2">
                <span class="checkmark"></span>
                <span class="checkbox-text">2</span>
            </label>
            <label class="custom-checkbox">
                <input type="radio" name="R" value="3">
                <span class="checkmark"></span>
                <span class="checkbox-text">3</span>
            </label>
            <label class="custom-checkbox">
                <input type="radio" name="R" value="4">
                <span class="checkmark"></span>
                <span class="checkbox-text">4</span>
            </label>
            <label class="custom-checkbox">
                <input type="radio" name="R" value="5">
                <span class="checkmark"></span>
                <span class="checkbox-text">5</span>
            </label>
        </div>

        <div style="margin-top: 10px;">
            <button type="submit" class="roll_button">START</button>
        </div>
    </form>
    <button class="clear">Clear table</button>

        <div id="response" class="response-banner"></div>
        <div id="successBanner" class="success-banner center-container">JACKPOT!!!</div>

    <iframe src="http://localhost:3000/d-solo/ad48bbn/lab2?orgId=1&panelId=1&from=now-5m&to=now&refresh=5s&theme=light"></iframe>
<script>
    const points = [
        <c:forEach var="i" items="${bean.x}" varStatus="status">
            {
                x: ${bean.x[status.index]},
                y: ${bean.y[status.index]},
                r: ${bean.r[status.index]},
                success: ${bean.success[status.index]}
            }<c:if test="${!status.last}">,</c:if>
        </c:forEach>
    ];

    window.addEventListener("DOMContentLoaded", () => {
        drawCS();
        points.forEach(p => drawPoint(p.x, p.y, p.r, p.success ? 'lime' : 'red'));
    });

    document.querySelector(".clear").addEventListener("click", () => {
        const canvas = document.getElementById("coordCanvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCS();
    });
</script>
<script src="${pageContext.request.contextPath}/scripts/coord_sys.js"></script>
<script src="${pageContext.request.contextPath}/scripts/init.js"></script>
</body>
</html>
