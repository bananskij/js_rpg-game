const name = prompt("Введите имя персонажа")

let playerHealth = Math.floor(Math.random() * 100 + 10)

let locations = [
    "Кристальные подземелья",
    "Кладбище некроманта",
    "Лаборатория крыселова",
    "Луноцветные луга",
    "Озеро гнили",
    "Лачуга гиганта",
    "Логово дракона-лича",
    "Пустоши нежити",
    "Чумной город"
]

let items = {
    0: {
        name: "Железный меч",
        attack: 15,
        armor: 0
    },
    1: {
        name: "Железный шлем",
        attack: 0,
        armor: 4
    },
    2: {
        name: "Железные поножи",
        attack: 0,
        armor: 4
    },
    3: {
        name: "Железный серп",
        attack: 11,
        armor: 0
    },
    4: {
        name: "Железная кираса",
        attack: 0,
        armor: 12
    }
}

let enemies = {
        0: {
            name: "Зомби",
            health: 120,
            armor: 7,
            damage: 5
        },
        1: {
            name: "Гнилой рыцарь",
            health: 100,
            armor: 20,
            damage: 12
        },
        2: {
            name: "Кролик",
            health: 5,
            damage: 0,
            armor: 999
        },
        3: {
            name: "Злобный глаз",
            health: 70,
            damage: 25,
            armor: 0
        },
        4: {

        }
    }

const Player = class {
    constructor(name, health, armor, damage) {
        this.name = name
        this.health = health
        this.armor = armor
        this.damage = damage
        this.inventory = new Array()
        this.isFight = false
        this.enemy = {}
    }

    getStats() {
        console.log(`Характеристики игрока ${this.name}:`)
        console.log(`    - Здоровье: ${this.health}:`)
        console.log(`    - Броня: ${this.armor}:`)
        console.log(`    - Урон: ${this.damage}:`)
    }

    getInventory() {
        console.log(`Инвентарь игрока ${this.name}:`)
        if (this.inventory == null || this.inventory.length == 0) {
            console.log("Инвентарь пуст")
            return
        }
        this.inventory.forEach((item) => {
            console.log(` [ ${item} ]`)
        })
    }

    fight() {
        if(this.isFight) {
            console.log("Вы уже находитесь в бою!")
            return
        }
        this.enemy = enemies[Math.floor(Math.random() * 4)]
        this.isFight = true
        console.log(`Бродя по бездушным пустошам, вы наткнулись на... ${this.enemy.name}! Его характеристики:`)
        console.log(`  - Здоровье: ${this.enemy.health}`)
        console.log(`  - Защита: ${this.enemy.armor}`)
        console.log(`  - Урон: ${this.enemy.damage}`)
    }

    attack() {
        console.log(`Вы атакуете ${this.enemy.name} и наносите ${this.damage} урона`)
        if(this.damage - this.enemy.armor < 0) {
            console.log("У противника слишком мощная защита! Вы не наносите урона, и к сожалению, проигрываете и теряете все свои предметы...")
            this.death()
            return
        }
        console.log(`Вы наносите ${this.damage - this.enemy.armor} урона!`)
        this.enemy.health -= this.damage - this.enemy.armor
        console.log(`Противник контратакует и наносит ${this.enemy.damage - this.armor} урона!`)
        this.health -= this.enemy.damage - this.armor
        if(this.enemy.health < 0) {
            console.log("Враг повержен! Победа за вами!")
            this.isFight = false
            return
        }
        if(this.health < 0) {
            console.log("Враг наносит смертельный удар и вы погибаете. Бой проигран.")
            this.death()
            return
        }
    }

    rest() {
        if(this.isFight) {
            console.log("Лечение во время боя невозможно!")
            return
        }
        console.log("Вы присели у костра, чтобы восстановить свои силы...")
        setTimeout(() => { this.health = 100; console.log("Отдых окончен! Ваше здоровье полностью восстановлено.")}, 3600)

    }

    search() {
        if(this.isFight) {
            console.log("Исследование невозможно во время боя!")
            return
        }
        const randomEvent = Math.floor(Math.random()*4)
        if(randomEvent == 1) {
            console.log(`Во время исследования локации ${locations[Math.floor(Math.random() * locations.length)]} вы угодили в ловушку и теряете 30 единиц здоровья!`)
            this.health -= 30
            if(this.health < 0) {
                console.log("Во время путешествия вы погибли и теряете все свои предметы.")
                this.death()
                return
            }
            return
        }
        let item = items[Math.floor(Math.random() * 5)]
        if(this.inventory.includes(item.name)) {
            console.log(`Предмет ${item.name} уже находится в инвентаре. Поиски прошли даром.`)
            return
        }
        console.log(`Ваше путешествие завело вас в... ${locations[Math.floor(Math.random() * locations.length)]}! В ходе исследований вы обнаружили ${item.name}. Характеристики обновлены`)
        this.inventory.push(item.name)
        this.damage += item.attack
        this.armor += item.armor
    }

    death() {
        console.log("Смерть настигла вас...")
        this.isFight = false
        this.health = 1
        this.inventory = []
        this.damage = 5
        this.armor = 0
    }

    leave() {
        if(!this.isFight) {
            console.log("Вы не находитесь в бою!")
            return
        }
        console.log("Вы сбегаете от боя и теряете все свои предметы!")
        this.inventory = []
    }
}

const player = new Player(name, playerHealth, 0, 5)