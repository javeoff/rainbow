const Discord = require('discord.js');
const client = new Discord.Client();

DATA = {}
DATA.server = {
    "Rainbow":["#c93b3b", "#3cc93b", "#3baac9", "#763bc9"],
    // "Blue":["#4791db", "#1976d2", "#115293"],
    // "Red":["#d81b60", "#f50057", "#ec407a"],
    // "Green":["#7cb342", "#9ccc65", "#b2ff59"],
    // "Sun":["#fb8c00", "#ffb74d", "#ef6c00"],
    // "Mono":["#f5f5f5", "#bdbdbd", "#757575", "#616161", "#212121"],
    // "Color":["#4791db", "#e33371", "#e57373", "#ffb74d","#64b5f6","#81c784"],
    // "Hide":["#2f3136","#8e9297"]
}
DATA.premium = [

]
DATA.timeout = 10000

class Rainbow {
    static changeColor(name, colors, timeout) {
        var role_arr = []
        var point = 0

        setInterval(() => {
            client.guilds.cache.each(async guild => {
                const role = await guild.roles.cache.find(role => role.name === name)
                if (role) role_arr.push(role)
            })

            point = colors[point+1] ? point+1 : 0
            role_arr.forEach(role => {
                role.setColor(colors[point]).catch(e => delete role_arr[role])
                console.log(role.name, colors[point])
            });

            role_arr = []
        }, timeout)
        if (!colors[point+1]) colors.reverse()
    }
}

client.on('ready', async () => {
    for (const prop in DATA.server) {
        if (prop == "Rainbow") Rainbow.changeColor(prop, DATA.server[prop], DATA.timeout)
        else {
            DATA.premium.forEach(id => {
                client.guilds.cache.each(async guild => {
                    if (guild.id == id) Rainbow.changeColor(prop, DATA.server[prop], DATA.timeout)
                })
            })
        }
    }
})

client.login(process.env.BOT_TOKEN)