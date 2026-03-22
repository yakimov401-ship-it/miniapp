let player = null;
let user_id = null;

const API_URL = "https://unquavering-revelational-marinda.ngrok-free.dev";

// ID
if (window.Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe.user) {
    user_id = Telegram.WebApp.initDataUnsafe.user.id;
} else {
    user_id = localStorage.getItem("user_id");

    if (!user_id) {
        user_id = "user_" + Math.random().toString(36).substring(2);
        localStorage.setItem("user_id", user_id);
    }
}

// Игрок
async function loadPlayer() {
    const res = await fetch(API_URL + "/get_player", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id })
    });

    player = await res.json();
    updateUI();
}

// Мир
async function loadWorld() {
    const res = await fetch(API_URL + "/get_world");
    const world = await res.json();

    document.getElementById("world").innerText =
        JSON.stringify(world["ресурсы"], null, 2);
}

// UI
function updateUI() {
    document.getElementById("resources").innerText =
        JSON.stringify(player.resources, null, 2);

    document.getElementById("items").innerText =
        player.items.join(", ");
}

// Сбор
async function gather() {
    const response = await fetch(API_URL + "/gather", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id })
    });

    const data = await response.json();

    if (data.error) {
        alert("Ресурс закончился");
        return;
    }

    player = data.player;

    alert("Ты нашёл: " + data.resource);

    updateUI();
    loadWorld();
}

// Запуск
loadPlayer();
loadWorld();
