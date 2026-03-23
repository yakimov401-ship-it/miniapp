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

async function loadPlayer() {
    const res = await fetch(API_URL + "/get_player", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id })
    });

    player = await res.json();
    updateUI();
}

function updateUI() {
    document.getElementById("zodiac").innerText = player.zodiac || "нет";
    document.getElementById("element").innerText = player.element || "нет";

    document.getElementById("resources").innerText =
        JSON.stringify(player.resources, null, 2);

    document.getElementById("items").innerText =
        player.items.join(", ");

    document.getElementById("queue").innerText =
        JSON.stringify(player.craft_queue, null, 2);
}

async function setBirth() {
    const day = prompt("День (1-31)");
    const month = prompt("Месяц (1-12)");

    const res = await fetch(API_URL + "/set_birth", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id, day, month })
    });

    const data = await res.json();

    player.zodiac = data.zodiac;
    player.element = data.element;

    updateUI();
}

async function gather() {
    const res = await fetch(API_URL + "/gather", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id })
    });

    const data = await res.json();

    alert(`+${data.amount} ${data.resource}`);

    player = data.player;
    updateUI();
}

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
