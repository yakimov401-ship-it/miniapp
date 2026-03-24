<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Община RPG</title>

<style>
body {
    margin: 0;
    font-family: Arial;
    background: #0f172a;
    color: white;
}

.container {
    padding: 20px;
    max-width: 700px;
    margin: auto;
}

.card {
    background: #1e293b;
    padding: 15px;
    border-radius: 12px;
    margin-bottom: 15px;
}

button {
    background: #3b82f6;
    border: none;
    padding: 10px;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    margin: 5px;
}

.inventory {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.slot {
    background: #020617;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    position: relative;
}

.count {
    position: absolute;
    bottom: 5px;
    right: 8px;
    font-size: 12px;
    color: #94a3b8;
}

.log {
    background: #020617;
    padding: 10px;
    border-radius: 8px;
    height: 100px;
    overflow-y: auto;
    font-size: 14px;
}
</style>

</head>
<body>

<div class="container">

<h1>⚔ ОБЩИНА RPG</h1>

<div class="card">
    Уровень: <span id="level"></span> |
    XP: <span id="xp"></span> |
    Очки: <span id="points"></span>
</div>

<div class="card">
    🌙 Знак: <span id="zodiac"></span><br>
    🌊 Стихия: <span id="element"></span><br>
    <button onclick="setBirth()">🎂 Дата рождения</button>
</div>

<div class="card">
    <h3>🎒 Инвентарь</h3>
    <div id="inventory" class="inventory"></div>
</div>

<div class="card">
    <button onclick="gather()">⛏ Собирать</button>
</div>

<div class="card">
    <h3>⚒ Крафт</h3>
    <button onclick="craft('нож')">🔪</button>
    <button onclick="craft('копье')">🪓</button>
    <button onclick="craft('одежда')">👕</button>
    <button onclick="craft('броня')">🛡</button>
</div>

<div class="card">
    <h3>📜 Лог</h3>
    <div id="log" class="log"></div>
</div>

</div>

<script src="script.js"></script>
</body>
</html>
