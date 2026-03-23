let player = null;
let user_id = null;

const API_URL = "https://unquavering-revelational-marinda.ngrok-free.dev";

if (window.Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe.user) {
    user_id = Telegram.WebApp.initDataUnsafe.user.id;
} else {
    user_id = "test_user";
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
    document.getElementById("zodiac").innerText =
        player.zodiac || "не выбран";

    document.getElementById("element").innerText =
        player.element || "нет";

    document.getElementById("resources").innerText =
        JSON.stringify(player.resources, null, 2);
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

    alert(`Знак: ${data.zodiac} | Стихия: ${data.element}`);

    updateUI();
}

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

loadPlayer();
