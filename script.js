let player = null;
let user_id = null;

const API_URL = "https://unquavering-revelational-marinda.ngrok-free.dev";

if (window.Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe.user) {
    user_id = Telegram.WebApp.initDataUnsafe.user.id;
} else {
    user_id = "test_user";
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

// установить дату рождения
async function setBirth() {
    const day = prompt("День рождения (1-31)");
    const month = prompt("Месяц (january, february...)");

    const res = await fetch(API_URL + "/set_birth", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id, day, month })
    });

    const data = await res.json();

    player.zodiac = data.zodiac;

    alert("Твой знак: " + data.zodiac);
    updateUI();
}

// UI
function updateUI() {
    document.getElementById("zodiac").innerText =
        player.zodiac || "не выбран";
}

// старт
loadPlayer();
