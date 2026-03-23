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

// UI
function updateUI() {
    document.getElementById("zodiac").innerText =
        player.zodiac || "не выбран";

    document.getElementById("bonus").innerText =
        player.bonus ? player.bonus.text : "нет";

    document.getElementById("resources").innerText =
        JSON.stringify(player.resources, null, 2);
}

// 🔥 ВОТ НОРМАЛЬНЫЙ ВВОД ДАТЫ
async function setBirth() {
    const day = prompt("Введи день (1-31)");
    const month = prompt("Введи месяц (1-12)");

    if (!day || !month) {
        alert("Нужно ввести дату");
        return;
    }

    const res = await fetch(API_URL + "/set_birth", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id, day, month })
    });

    const data = await res.json();

    if (data.error) {
        alert("Ошибка");
        return;
    }

    player.zodiac = data.zodiac;

    alert("Твой знак: " + data.zodiac);

    updateUI();
}

// 🔮 гороскоп
async function getHoroscope() {
    const res = await fetch(API_URL + "/get_horoscope", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id })
    });

    const data = await res.json();

    if (data.error) {
        alert("Сначала введи дату рождения");
        return;
    }

    alert(data.text);
}

// ⛏ сбор
async function gather() {
    const res = await fetch(API_URL + "/gather", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id })
    });

    const data = await res.json();

    alert(`Ты нашёл ${data.resource} x${data.amount}`);

    player = data.player;
    updateUI();
}

// старт
loadPlayer();
