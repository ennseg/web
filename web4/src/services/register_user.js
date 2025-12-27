export async function register_user(username, password) {
    const response = await fetch("http://localhost:8080/lab4/api/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.token == null) {
        return { success: false, message: "Этот логин уже занят" };
    }

    localStorage.setItem("token", data.token);

    return { success: true };
}