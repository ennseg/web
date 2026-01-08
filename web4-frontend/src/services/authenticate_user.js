export async function authenticate_user(username, password) {
    const response = await fetch("http://localhost:8080/lab4/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.token == null) {
        return { success: false, message: "Неверный логин или пароль" };
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username);

    return { success: true };
}
