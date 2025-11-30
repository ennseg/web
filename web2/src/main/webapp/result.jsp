<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fn" uri="jakarta.tags.functions" %>

<html>
<head>
    <title>Результат проверки</title>
</head>
<body>
<h2>Результаты проверки</h2>

<table border="1">
    <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Попадание</th>
    </tr>
    <c:if test="${fn:length(xList)-1 >= 0}">
        <c:forEach var="i" begin="0" end="${fn:length(xList)-1}">
            <tr>
                <td>${xList[i]}</td>
                <td>${yList[i]}</td>
                <td>${rList[i]}</td>
                <td>${successList[i]}</td>
            </tr>
        </c:forEach>
    </c:if>
</table>

<a href="${pageContext.request.contextPath}">Назад</a>
</body>
</html>
