let player = null;
let user_id = null;

const API_URL = "https://unquavering-revelational-marinda.ngrok-free.dev";

// Получаем Telegram ID
if (window.Telegram && Telegram.WebApp) {
    user_id = Telegram.WebApp.initDataUnsafe.user.id;
} else {
    user_id = "test_user";
}

// ЗАГРУЗКА
async function loadPlayer() {
    const res = await fetch(API_URL + "/get_player", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id })
    });

    player = await res.json();
    updateUI();
}

// СОХРАНЕНИЕ
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

// UI
function updateUI() {
    document.getElementById("resources").innerText =
        JSON.stringify(player.resources);

    document.getElementById("items").innerText =
        player.items.join(", ");
}

// ИГРА
function gather() {
    const resList = ["камень", "дерево", "трава"];
    const res = resList[Math.floor(Math.random() * resList.length)];

    player.resources[res] = (player.resources[res] || 0) + 1;

    alert("Ты нашёл: " + res);
    savePlayer();
    updateUI();
}

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

// ЗАПУСК
loadPlayer();
