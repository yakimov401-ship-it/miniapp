let player = null;
let user_id = null;

const API_URL = "https://unquavering-revelational-marinda.ngrok-free.dev";

if (window.Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe.user) {
    user_id = Telegram.WebApp.initDataUnsafe.user.id;
} else {
    user_id = localStorage.getItem("user_id");

    if (!user_id) {
        user_id = "user_" + Math.random().toString(36).substring(2);
        localStorage.setItem("user_id", user_id);
    }
}

// загрузка
async function loadPlayer() {
    const res = await fetch(API_URL + "/get_player", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id })
    });

    player = await res.json();
    updateUI();
}

// UI
function updateUI() {
    document.getElementById("resources").innerText =
        JSON.stringify(player.resources, null, 2);

    document.getElementById("items").innerText =
        player.items.join(", ");

    document.getElementById("queue").innerText =
        JSON.stringify(player.craft_queue, null, 2);
}

// сбор
function gather() {
    const list = ["камень", "дерево", "трава"];
    const r = list[Math.floor(Math.random() * list.length)];

    player.resources[r] = (player.resources[r] || 0) + 1;

    alert("Ты добыл: " + r);
    updateUI();
}

// крафт
async function craft(item) {
    const res = await fetch(API_URL + "/start_craft", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id, item })
    });

    const data = await res.json();

    if (data.error) {
        alert(data.error);
        return;
    }

    player = data;
    updateUI();
}

// обновление
async function updateCraft() {
    const res = await fetch(API_URL + "/update_craft", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id })
    });

    player = await res.json();
    updateUI();
}

setInterval(updateCraft, 2000);

loadPlayer();
