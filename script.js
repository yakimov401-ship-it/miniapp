let player = null;
let user_id = null;

const API_URL = "https://unquavering-revelational-marinda.ngrok-free.dev";

// ✅ УНИКАЛЬНЫЙ ID
if (window.Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe.user) {
    user_id = Telegram.WebApp.initDataUnsafe.user.id;
} else {
    user_id = localStorage.getItem("user_id");

    if (!user_id) {
        user_id = "user_" + Math.random().toString(36).substring(2);
        localStorage.setItem("user_id", user_id);
    }
}

// 🔄 ЗАГРУЗКА ИГРОКА
async function loadPlayer() {
    const res = await fetch(API_URL + "/get_player", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id })
    });

    player = await res.json();
    updateUI();
}

// 💾 СОХРАНЕНИЕ
async function savePlayer() {
    await fetch(API_URL + "/save_player", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            user_id,
            player
        })
    });
}

// 🌍 ПОЛУЧЕНИЕ МИРА
async function loadWorld() {
    const res = await fetch(API_URL + "/get_world");
    const world = await res.json();

    document.getElementById("world").innerText =
        JSON.stringify(world["ресурсы"]);
}

// 🎨 UI
function updateUI() {
    document.getElementById("resources").innerText =
        JSON.stringify(player.resources);

    document.getElementById("items").innerText =
        player.items.join(", ");
}

// ⛏ СБОР (MMO)
async function gather() {
    const resList = ["камень", "дерево", "трава"];
    const res = resList[Math.floor(Math.random() * resList.length)];

    const response = await fetch(API_URL + "/gather", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            user_id,
            resource: res
        })
    });

    const data = await response.json();

    if (data.error) {
        alert("Ресурс закончился");
        return;
    }

    player = data.player;

    alert("Ты добыл: " + res);

    updateUI();
    loadWorld();
}

// ⚒ КРАФТ
function craft(item) {
    const recipes = {
        "нож": ["камень", "дерево"],
        "факел": ["дерево", "трава"]
    };

    const recipe = recipes[item];

    for (let r of recipe) {
        if (!player.resources[r] || player.resources[r] < 1) {
            alert("Не хватает ресурсов");
            return;
        }
    }

    for (let r of recipe) {
        player.resources[r]--;
    }

    player.items.push(item);

    alert("Создано: " + item);

    savePlayer();
    updateUI();
}

// 🚀 ЗАПУСК
loadPlayer();
loadWorld();
