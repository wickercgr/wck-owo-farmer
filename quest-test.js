const fs = require('fs');
const Discord = require('discord.js-selfbot-v13');
const uptime = require("moment");
const chalk = require("chalk");
const util = require('util');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./database.json" });

const origConsoleLog = console.log;

console.log = function () {
    const now = new Date();
    const options = {
        timeZone: 'Europe/Istanbul',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const formattedDate = chalk.rgb(51, 255, 153)('[' + now.toLocaleString('tr-TR', options) + ']');
    const args = Array.from(arguments);
    args.unshift(formattedDate);
    origConsoleLog.apply(console, args);
};

time = Date.now()

console.log(chalk.red("[WCK SCRIPT] ") + chalk.rgb(230, 184, 0)("Status ") + chalk.green("[+] "));
console.log(chalk.red("[WCK SCRIPT] ") + chalk.rgb(230, 184, 0)("Captcha ") + chalk.green("[+] "));
console.log(chalk.red("[WCK SCRIPT] ") + chalk.rgb(230, 184, 0)("MS ") + chalk.green("[" + (Date.now() - time) + "]"));

const client = new Discord.Client({
    checkUpdate: false,
});

let gamblequestcount = 0;
let sayowoquestcount = 0;

client.on('ready', async () => {

    console.log(chalk.rgb(51, 119, 255)("[TOKEN] ") + chalk.rgb(204, 51, 153)("NAME ") + chalk.rgb(230, 184, 0)(`${client.user.tag}`));
    console.log(chalk.rgb(51, 119, 255)("[TOKEN] ") + chalk.rgb(204, 51, 153)("ID ") + chalk.rgb(230, 184, 0)(`${client.user.id}`));
    console.log(chalk.rgb(51, 119, 255)("[TOKEN] ") + chalk.rgb(204, 51, 153)("STATUS ") + chalk.green("+"));
    console.log(chalk.rgb(51, 119, 255)("[TOKEN] ") + chalk.rgb(204, 51, 153)("GUILD COUNT ") + chalk.green(`${client.guilds.cache.size}`));
    client.guilds.cache.forEach(guild => {
        console.log(chalk.rgb(51, 119, 255)("[TOKEN] ") + chalk.rgb(204, 51, 153)("GUILD NAME ") + chalk.green(`${guild.name}`));
    });
    console.log("");

    let guildcount = `${client.guilds.cache.size}`;
    if (guildcount > 0) {
        client.guilds.cache.forEach(guild => {

            //const channel = guild.channels.cache.find(channel => channel.name === 'chat' || channel.name === 'genel');
            const channel = guild.channels.cache.find(channel => channel.name === 'owo-bot-command-alex');

            if (!channel || !channel.send) {
                return;
            }

            /* QUEST BILGISI AL */

            channel.send("owo quest")

        /* GAMBLE QUESTI VARSA BUL */

        client.on('messageCreate', async message => {

            const regexgamble = /Gamble\s+(\d+)\s+times!/;
            const matchgamble = message?.embeds[0]?.description?.match(regexgamble);

            if (matchgamble) {
                const gamblecount = matchgamble[1];
                console.log(`Gamble (${gamblecount}) Quest'i bulundu`);
                gamblequestcount = gamblecount
              //  gamblequestprocess();
            }

            /* GAMBLE QUESTINI TAMAMLA */
            async function gamblequestprocess() {

                const gambleinterval = setInterval(async () => {

                    const gambleitem = ["owo cf ", "w cf ", "owo s ", 'w s ', 'w slot ', 'owo slot ']
                    const gambleitemrandom = gambleitem[Math.floor(Math.random() * gambleitem.length)];
                    const gamblebalance = Math.floor(Math.random() * 50) + 1; // 1 - 100 arası rastgele sayı

                    channel.send(gambleitemrandom + gamblebalance) // owo gamble komutu gönder
                    gamblequestcount = gamblequestcount - 1 // 1 azalt

                    if (gamblequestcount === -2) {
                        console.log("gamble owo quest tamamlandı");
                        clearInterval(gambleinterval);
                    }

                }, Math.floor(Math.random() * (180 - 60 + 1) + 60) * 1000);

            }

            /* SAY OWO QUESTI VARSA BUL */
            const regexsayowo = /Say\s+'owo'\s+(\d+)\s+times!/;
            const matchsayowo = message?.embeds[0]?.description?.match(regexsayowo);

            if (matchsayowo) {
                const sayowocount = matchsayowo[1];
                console.log(`Say owo (${sayowocount}) Quest'i bulundu`);
                sayowoquestcount = sayowocount
                sayowoquestprocess();
            }

            /* SAY OWO QUESTINI TAMAMLA */
            async function sayowoquestprocess() {

                const sayowointerval = setInterval(async () => {

                    channel.send("owo") // owo komutu gönder
                    sayowoquestcount = sayowoquestcount - 1 // 1 azalt

                    if (sayowoquestcount === -2) {
                        console.log("say owo quest tamamlandı");
                        clearInterval(sayowointerval);
                    }

                }, Math.floor(Math.random() * (30 - 15 + 1) + 15) * 1000);

            }

            /* USE AN ACTION COMMAND ON SOMEONE QUESTI VARSA BUL */
            const regexactioncommand = /Use\s+'an'\s+'action'\s+'command'\s+'on'\s+'someone'\s+(\d+)\s+times!/;
            const matchactioncommand = message?.embeds[0]?.description?.match(regexactioncommand);

            if (matchactioncommand) {
                const actioncommandcount = matchactioncommand[1];
                console.log(`Use an action command on someone (${actioncommandcount}) Quest'i bulundu`);
                actioncommandquestcount = actioncommandcount
                actioncommandquestprocess();
            }

            /* Use an action command on someone QUESTINI TAMAMLA */
            async function actioncommandquestprocess() {

                const actioncommandinterval = setInterval(async () => {

                    actioncommanditems = ["owo kiss", "owo cuddle", "owo lick", "owo nom", "owo pat", "owo poke",
                        "owo slap", "owo stare", "owo highfive", "owo bite",
                        "owo punch", "owo kill", "owo hold", "owo tickle"]
                    let actioncommanditemrandom = actioncommanditems[Math.floor(Math.random() * actioncommanditems.length)];
                    channel.send(actioncommanditemrandom + " <@408785106942164992>") // owo komutu gönder
                    actioncommandquestcount = actioncommandquestcount - 1 // 1 azalt

                    if (actioncommandquestcount === -2) {
                        console.log("Use an action command on someone quest tamamlandı");
                        clearInterval(actioncommandinterval);
                    }

                }, Math.floor(Math.random() * (30 - 15 + 1) + 15) * 1000);

            }


            /* RECEIEVE COOKIE QUEST SELECTOR */
            const regexsendcookie = /Receive\s+a\s+cookie\s+from\s+(\d+)\s+friends!/i;
            const matchsendcookie = message?.embeds[0]?.description?.match(regexsendcookie);

            if (matchsendcookie) {
                const sendcookiecount = matchsendcookie[1];
                console.log(`Receive a cookie from ${sendcookiecount} friends! Quest'i bulundu`);
            }

            /* BIRI SENIN UZERINDE x KERE KOMUT KULLANSIN QUEST SELECTOR */
            const regexfriendactioncommand = /Have\s+a\s+friend\s+use\s+an\s+action\s+commands\s+on\s+you\s+(\d+)\s+times!/i;
            const matchfriendactioncommand = message?.embeds[0]?.description?.match(regexfriendactioncommand);

            if (matchfriendactioncommand) {
                const friendactioncommandcount = matchfriendactioncommand[1];
                console.log(`Have a friend use an action command on you ${friendactioncommandcount} times! Quest'i bulundu`);
                friendactioncommandquestprocess();
            }


            /* BIRI SENIN UZERINDE x KERE KOMUT KULLANSIN QUESTINI TAMAMLA */
            async function friendactioncommandquestprocess() {

                const guilds = client.guilds.cache;
                const wickerids = ["1095093670564331731"]; // owo bot idsi girilecek

                for (const guild of guilds.values()) { // Tüm sunucular için döngü başlatılıyor.
                    for (const wickerid of wickerids) { // Her kullanıcı için döngü başlatılıyor.
                        try {
                            const member = await guild.members.fetch(wickerid);
                            const dmchannel = await member.createDM();

                            await dmchannel.send("friendactioncommandquestprocess " + `${friendactioncommandcount}`);

                            console.log(`Direct message sent to user with ID ${wickerid} in guild ${guild.id}`);
                        } catch (error) {
                            console.log(`Error sending direct message to user with ID ${wickerid} in guild ${guild.id}: ${error}`);
                        }
                    }
                }
            }


        });

            /*
             * Have a friend use an action command on you 5 times!
             * Use an action command on someone 1 times! (+)
             * Gamble 500 times! (+)
             * Say owo 500 times! (+)
             * Receive a cookie from 4 friends!
             * Have a friend pray to you 5 times!
             * Battle with a friend 3 times!
             * Have a friend curse you 3 times!
             * Have a friend use an action command on you 3 times!
             */

        });

    }

});

client.login("x")