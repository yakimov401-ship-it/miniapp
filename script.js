let player = {
    resources: {
        камень: 2,
        дерево: 1,
        трава: 1
    },
    items: []
};

function updateUI() {
    document.getElementById("resources").innerText =
        JSON.stringify(player.resources);

    document.getElementById("items").innerText =
        player.items.join(", ");
}

function gather() {
    const resList = ["камень", "дерево", "трава"];
    const res = resList[Math.floor(Math.random() * resList.length)];

    player.resources[res] = (player.resources[res] || 0) + 1;

    alert("Ты нашёл: " + res);
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
    updateUI();
}

updateUI();