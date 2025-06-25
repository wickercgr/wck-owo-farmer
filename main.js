const fs = require('fs');
const Discord = require('discord.js-selfbot-v13');
const uptime = require("moment");
const chalk = require("chalk");
const util = require('util');
const ac = require("@antiadmin/anticaptchaofficial");
const imageToBase64 = require('image-to-base64');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./database.json" });
/* TWO CAPTCHA */
const twocaptcha = require("2captcha");
const twocaptchasolver = new twocaptcha.Solver("x");

ac.setAPIKey('x');

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

let continuefilter = true;
/* AUTO SLEEP SYSTEM */
function setcontinuefilterFalse() {
    continuefilter = false;
    console.log("continuefilter => " + continuefilter)
    const waitTime = Math.floor(Math.random() * 60000 * 20) + 60000 * 30; // 30-50 dakika sleepten sonra bot tekrar başlayacak
    setTimeout(setcontinuefilterTrue, waitTime);
}

function setcontinuefilterTrue() {
    continuefilter = true;
    console.log("continuefilter => " + continuefilter)
    const waitTime = Math.floor(Math.random() * 60000 * 60 * 2) + 60000 * 60; // 60-120 dakika sonra bot sleep olacak
    setTimeout(setcontinuefilterFalse, waitTime);
}

setcontinuefilterTrue();
/* AUTO SLEEP SYSTEM BITIS */

let captchaUrl = '';

let anticaptchaanswer = "";

let twocaptchaanswer = "";

let captchadm = "";

let captcharesultcontrol = 0;

client.on('messageCreate', async message => {


    async function captchaprocess() {

        if (captcharesultcontrol === 2) {

            const capanswers = [anticaptchaanswer, twocaptchaanswer];

            const letteranswers = capanswers.map(answer => {
                return answer.replace(/0/g, 'o').replace(/9/g, 'g').replace(/8/g, 's').replace(/7/g, 'y').replace(/1/g, 'l').replace(/2/g, 'm').replace(/3/g, 'x').replace(/4/g, 'y').replace(/5/g, 's').replace(/6/g, 'k');
            });

            
            const caplowercase = letteranswers.map((str) => str.toLowerCase());

            const counters = {};

            
            for (let i = 0; i < caplowercase.length; i++) {
                for (let j = 0; j < caplowercase[i].length; j++) {
                    const char = caplowercase[i][j];
                    if (!counters[char]) {
                        counters[char] = new Array(caplowercase[0].length).fill(0);
                    }
                }
            }

            
            for (let i = 0; i < caplowercase.length; i++) {
                for (let j = 0; j < caplowercase[i].length; j++) {
                    const char = caplowercase[i][j];
                    counters[char][j]++;
                }
            }

            
            let capresult = "";
            for (let j = 0; j < caplowercase[0].length; j++) {
                let highestCount = 0;
                let highestChar = "";
                for (let char in counters) {
                    if (counters[char][j] > highestCount) {
                        highestCount = counters[char][j];
                        highestChar = char;
                    }
                }
                capresult += highestChar;
            }

            console.log(chalk.red("[WCK CAPTCHA] ") + chalk.green("! LAST CAPTCHA RESULT ! ") + chalk.rgb(230, 184, 0)(capresult));
            continuefilter = false;
            sendcaptcha();
            captchadm = capresult;
            captcharesultcontrol = 0;
        } else {
            console.log(chalk.red("[WCK CAPTCHA] ") + chalk.red("! CAPTCHA NOT READY YET ! "));
        }
    }

    async function sendcaptcha() {
        const guild = client.guilds.cache.get("1094013595567800432");
        const wickerids = ["408785106942164992"];
        //const wickerids = ["1095093670564331731"];
        for (const wickerid of wickerids) {
            const member = await guild.members.fetch(wickerid);
            const dmchannel = await member.createDM();
            await dmchannel.send(captchadm);
            return;
        }
    }

    async function sendsingleanticaptcha() {
        const guild = client.guilds.cache.get("1094013595567800432");
        const wickerids = ["408785106942164992"];
        //const wickerids = ["1095093670564331731"];
        for (const wickerid of wickerids) {
            const member = await guild.members.fetch(wickerid);
            const dmchannel = await member.createDM();
            await dmchannel.send(captchadm);
            return;
        }
    }

    async function captchaalert() {
        const guild = client.guilds.cache.get("1094013595567800432");
        const wickerids = ["1095093670564331731"];
        for (const wickerid of wickerids) {
            const member = await guild.members.fetch(wickerid);
            const dmchannel = await member.createDM();
            await dmchannel.send("🤖 | OwO botundan captcha geldi.\n" + captchaUrl)
            return;
        }
    }

    async function captchasuccesalert() {
        const guild = client.guilds.cache.get("1094013595567800432");
        const wickerids = ["1095093670564331731"];
        for (const wickerid of wickerids) {
            const member = await guild.members.fetch(wickerid);
            const dmchannel = await member.createDM();
            await dmchannel.send("✅ | Captcha başarılı bir şekilde çözüldü.");
            return;
        }
    }

    async function captchawarning() {
        const guild = client.guilds.cache.get("1094013595567800432");
        const wickerids = ["1095093670564331731"];
        for (const wickerid of wickerids) {
            const member = await guild.members.fetch(wickerid);
            const dmchannel = await member.createDM();
            await dmchannel.send("🚫 | Captcha çözme işlemi tamamen başarısız oldu.\n" +
                captchaUrl + "\n"
                + " **!captchacoz <captcha-kodu>** yazarak captcha işlemini bota gönderebilirsin.");
            return;
        }
    }

    if (message.content.startsWith('!captchacoz ')) {
        captchadm = message.content.replace('!captchacoz ', '');
        console.log(chalk.green("[WCK-MANUAL-CAPTCHA] ") + chalk.rgb(204, 51, 153)("! " + captchadm + " !"));
        sendcaptcha();
    }

    /* ANTI CAPTCHA SINLGE SOLVE PROCESS */
    async function anticaptchasinglesolveprocess() {
        let solvedanticaptchaanswer; 

        async function sendsingleanticaptcha() {
            const guild = client.guilds.cache.get("1094013595567800432");
            const wickerids = ["408785106942164992"];
            //const wickerids = ["1095093670564331731"];
            for (const wickerid of wickerids) {
                const member = await guild.members.fetch(wickerid);
                const dmchannel = await member.createDM();
                await dmchannel.send(solvedanticaptchaanswer.toLowerCase().replace(/0/g, 'o'));
                return;
            }
        }

        try {
            console.log(captchaUrl);
            const base64 = await imageToBase64(captchaUrl);
            solvedanticaptchaanswer = await ac.solveImage(base64, true);
            await console.log(chalk.red("[CAPTCHA-1] ") + chalk.rgb(204, 51, 153)("! ANTI-CAPTCHA ANSWER ! ") + chalk.rgb(230, 184, 0)(solvedanticaptchaanswer.toLowerCase().replace(/0/g, 'o').replace(/9/g, 'g').replace(/8/g, 's').replace(/7/g, 'y').replace(/1/g, 'l').replace(/2/g, 'm').replace(/3/g, 'x').replace(/4/g, 'y').replace(/5/g, 's').replace(/6/g, 'k'))); // Büyük harfleri küçük harflere çevir, "0" karakterini "o" harfine çevir
            sendsingleanticaptcha();
            continuefilter = false;
        } catch (error) {
            await console.log(chalk.red("[CAPTCHA-1] ") + chalk.rgb(204, 51, 153)("! 0 WORKER ERROR, RETRYING ! ") + chalk.rgb(230, 184, 0)(error)); // 'error' değişkenini kullan, 'solvedanticaptchaanswer' yerine
            setTimeout(() => {
                anticaptchasinglesolveprocess();
            }, 1000);
        }
    }


    /* TWO CAPTCHA SINGLE SOLVE PROCESS */
    async function twocaptchasinglesolveprocess() {

        async function sendsingletwocaptcha() {
            const guild = client.guilds.cache.get("1094013595567800432");
            const wickerids = ["408785106942164992"];
            //const wickerids = ["1095093670564331731"];
            for (const wickerid of wickerids) {
                const member = await guild.members.fetch(wickerid);
                const dmchannel = await member.createDM();
                await dmchannel.send(solvedtwocaptchaanswer.data.toLowerCase().replace(/0/g, 'o').replace(/9/g, 'g').replace(/8/g, 's').replace(/7/g, 'y').replace(/1/g, 'l').replace(/2/g, 'm').replace(/3/g, 'x').replace(/4/g, 'y').replace(/5/g, 's').replace(/6/g, 'k')); // Büyük harfleri küçük harflere çevir, sayıları harfe dönüştür
                return;
            }
        }

        const base64 = await imageToBase64(captchaUrl);
        let solvedtwocaptchaanswer = await twocaptchasolver.imageCaptcha(base64);
        await console.log(chalk.red("[CAPTCHA] ") + chalk.rgb(204, 51, 153)("! TWO-CAPTCHA ANSWER ! ") + chalk.rgb(230, 184, 0)(solvedtwocaptchaanswer.data.toLowerCase().replace(/0/g, 'o'))); // Büyük harfleri küçük harflere çevir, "0" karakterini "o" harfine çevir
        await sendsingletwocaptcha();
        continuefilter = false;
    }

    /* ANTI CAPTCHA SOLVE PROCESS */
    async function anticaptchasolveprocess() {
        try {
            const base64 = await imageToBase64(captchaUrl);
            const solvedanticaptchaanswer = await ac.solveImage(base64, true);
            await console.log(chalk.red("[CAPTCHA] ") + chalk.rgb(204, 51, 153)("! ANTI-CAPTCHA ANSWER ! ") + chalk.rgb(230, 184, 0)(solvedanticaptchaanswer));
            anticaptchaanswer = solvedanticaptchaanswer;
            captcharesultcontrol = captcharesultcontrol + 1;
            await captchaprocess();
            continuefilter = false;
        } catch (error) {
            await console.log(chalk.red("[CAPTCHA] ") + chalk.rgb(204, 51, 153)("! 0 WORKER ERROR, RETRYING ! ") + chalk.rgb(230, 184, 0)(solvedanticaptchaanswer));
            setTimeout(() => {
                anticaptchasolveprocess()
            }, 1000);
        }
    }

    /* TWO CAPTCHA SOLVE PROCESS */
    async function twocaptchasolveprocess() {
        const base64 = await imageToBase64(captchaUrl);
        let solvedtwocaptchaanswer = await twocaptchasolver.imageCaptcha(base64);
        await console.log(chalk.red("[CAPTCHA] ") + chalk.rgb(204, 51, 153)("! TWO-CAPTCHA ANSWER ! ") + chalk.rgb(230, 184, 0)(solvedtwocaptchaanswer.data));
        twocaptchaanswer = solvedtwocaptchaanswer.data;
        captcharesultcontrol = captcharesultcontrol + 1;
        await captchaprocess();
        continuefilter = false;
    }
	//haveimage
    if (message.content.includes('Are you a real human?') || message.content.includes('Beep Boop. Please DM me')) {
        if (message.attachments.size > 0) {
            captchaUrl = message.attachments.first().url;
            console.log(chalk.red("[IMAGE-CAPTCHA] ") + chalk.rgb(204, 51, 153)("! FOUND CAPTCHA !"));
            continuefilter = false;
            twocaptchasinglesolveprocess(); 
            captchaalert(); 
        }
    }

    
    if (message.content.includes('https://owobot.com/captcha')) {
            console.log(chalk.red("[LINK-CAPTCHA] ") + chalk.rgb(204, 51, 153)("! FOUND CAPTCHA !"));
            continuefilter = false;
    }

    
    if (message.content.includes('Please complete your captcha to verify that you are human!')) {
        console.log(chalk.rgb(51, 119, 255)("[AI] ") + chalk.rgb(230, 184, 0)('TOKEN OPERATIONS STOPPED , WAITING TRUE CAPTCHA ANSWER') + chalk.red(' [...]'));
        continuefilter = false;
    }

    
    if (message.content.includes('Wrong verification code! Please try again (1/3)')) {
        console.log(chalk.red("[CAPTCHA] ") + chalk.rgb(204, 51, 153)("! WRONG VERIFICATION CODE LIMIT HAS EXPIRED " + "(1/3)" + " !"));
        anticaptchasinglesolveprocess(); // TWO CAPTCHAYA ÇÖZDÜR
    }

    if (message.content.includes('Wrong verification code! Please try again (2/3)')) {
        console.log(chalk.red("[CAPTCHA] ") + chalk.rgb(204, 51, 153)("! WRONG VERIFICATION CODE LIMIT HAS EXPIRED " + "(2/3)" + " !"));
        continuefilter = false;
        anticaptchasolveprocess(); // WCK CAPTCHAYA ÇÖZDÜR
        twocaptchasolveprocess();
    }

    if (message.content.includes('Wrong verification code! Please try again (3/3)')) {
        continuefilter = false;
        console.log(chalk.red("[CAPTCHA] ") + chalk.rgb(204, 51, 153)("! WRONG VERIFICATION CODE LIMIT HAS EXPIRED " + "(3/3)" + " !"));
        captchawarning();
    }

    // TRUE CAPTCHA ANSWER FILTER
    if (message.content.includes('verified that you are human! Thank you!')) {
        console.log(chalk.green("[CAPTCHA] ") + chalk.rgb(204, 51, 153)("! CAPTCHA ANSWER TRUE !"));
        captchasuccesalert();
        continuefilter = true;
    }

    // BAN FILTER
    if (message.content.includes(`${client.user.username}!  ` + 'You have been banned')) {
        const bantime = message.content.match(/\d+/)[0]; // get number
        console.log(chalk.red("[BAN] ") + chalk.rgb(204, 51, 153)("! TOKEN BANNED FOR ! ") + chalk.rgb(230, 184, 0)(bantime + " hours"));
        continuefilter = false;
    }

});

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

           
            const channel = guild.channels.cache.find(channel => channel.name === 'owo-bot-command-test');


           
            channel.send("owo daily")
            channel.send("owo cookie <@1095093670564331731>")

            if (!channel || !channel.send) {
                return;
            }


            /* WICKER PANEL */
            client.on('messageCreate', async message => {

                async function wckpanel() {
                    const guild = client.guilds.cache.get("1094013595567800432");
                    const wickerids = ["1095093670564331731"];
                    for (const wickerid of wickerids) {
                        const member = await guild.members.fetch(wickerid);
                        const dmchannel = await member.createDM();
                        await dmchannel.send("✅ | Komut başarıyla kullanıldı.\n\n⚙️ | Kullanılan komut: **" + message.content + "**");
                        return;
                    }
                }

                if (message.content.startsWith('w!cash')) {
                    console.log(chalk.green("[WCK PANEL] ") + chalk.rgb(204, 51, 153)("! OWO CASH COMMAND SENT !"));
                    channel.send("owo cash")
                    wckpanel();
                }

                if (message.content.startsWith('w!zoo')) {
                    console.log(chalk.green("[WCK PANEL] ") + chalk.rgb(204, 51, 153)("! OWO ZOO COMMAND SENT !"));
                    channel.send("owo zoo")
                    wckpanel();
                }

                if (message.content.startsWith('w!sell')) {
                    console.log(chalk.green("[WCK PANEL] ") + chalk.rgb(204, 51, 153)("! OWO SELL COMMAND SENT !"));
                    channel.send("owo sell all")
                    wckpanel();
                }

                if (message.content.startsWith('w!inv')) {
                    console.log(chalk.green("[WCK PANEL] ") + chalk.rgb(204, 51, 153)("! OWO INV COMMAND SENT !"));
                    channel.send("owo inv")
                    wckpanel();
                }

                if (message.content.startsWith('w!lb')) {
                    console.log(chalk.green("[WCK PANEL] ") + chalk.rgb(204, 51, 153)("! OWO LB COMMAND SENT !"));
                    channel.send("owo lb all")
                    channel.send("owo crate all")
                    wckpanel();
                }

                if (message.content.startsWith('w!stop')) {
                    console.log(chalk.green("[WCK PANEL] ") + chalk.rgb(204, 51, 153)("! TOKEN IS STOPPED !"));
                    continuefilter = false;
                    wckpanel();
                }

                if (message.content.startsWith('w!start')) {
                    console.log(chalk.green("[WCK PANEL] ") + chalk.rgb(204, 51, 153)("! TOKEN IS STARTED !"));
                    continuefilter = true;
                    wckpanel();
                }

            });


            /* OWO USE SYSTEM START */

            const wait = async (time) => {
                return new Promise(resolve => setTimeout(resolve, time * 1000));
            };

            const clear = (str) => {
                return str.replace(/(:[a-z]+[0-9]+:|\`|\*\*|:blank:|(<a|<|\d+>))/gm, '')
                    .replace(':cgem1:', ' C??')
                    .replace(':ugem1:', ' U??')
                    .replace(':rgem1:', ' R??')
                    .replace(':egem1:', ' E??')
                    .replace(':mgem1:', ' M??')
                    .replace(':lgem1:', ' L??')
                    .replace(':fgem1:', ' F??')
                    .replace(':cgem3:', ' C???')
                    .replace(':ugem3:', ' U???')
                    .replace(':rgem3:', ' R???')
                    .replace(':egem3:', ' E???')
                    .replace(':mgem3:', ' M???')
                    .replace(':lgem3:', ' L???')
                    .replace(':fgem3:', ' F???')
                    .replace(':cgem4:', ' C??')
                    .replace(':ugem4:', ' U??')
                    .replace(':rgem4:', ' R??')
                    .replace(':egem4:', ' E??')
                    .replace(':mgem4:', ' M??')
                    .replace(':lgem4:', ' L??')
                    .replace(':fgem4:', ' F??');
            };

            let gem1sorgu = true;
            let gem2sorgu = true;
            let gem3sorgu = true;

            client.on("messageCreate", async message => {

                async function gemislemleri() {

                    let gemarr = [];
                    await wait(3);
                    if (!message.content.match(/:(c|u|r|e|m|l|f)gem1:/gm)) {
                        if (gem1sorgu === true) {
                            await channel.send("owo inv");
                            if (db.get("inventory").includes("057")) gemarr.push("57");
                            else if (db.get("inventory").includes("056")) gemarr.push("56");
                            else if (db.get("inventory").includes("055")) gemarr.push("55");
                            else if (db.get("inventory").includes("054")) gemarr.push("54");
                            else if (db.get("inventory").includes("053")) gemarr.push("53");
                            else if (db.get("inventory").includes("052")) gemarr.push("52");
                            else if (db.get("inventory").includes("051")) gemarr.push("51");
                            else {
                                console.log("gem1 yok")
                                gem1sorgu = false;
                            }
                        }
                    }
                    if (!message.content.match(/:(c|u|r|e|m|l|f)gem3:/gm)) {
                        if (gem2sorgu === true) {
                            await channel.send("owo inv");
                            if (db.get("inventory").includes("071")) gemarr.push("71");
                            else if (db.get("inventory").includes("070")) gemarr.push("70");
                            else if (db.get("inventory").includes("069")) gemarr.push("69");
                            else if (db.get("inventory").includes("068")) gemarr.push("68");
                            else if (db.get("inventory").includes("067")) gemarr.push("67");
                            else if (db.get("inventory").includes("066")) gemarr.push("66");
                            else if (db.get("inventory").includes("065")) gemarr.push("65");
                            else {
                                console.log("gem2 yok")
                                gem2sorgu = false;
                            }
                        }
                    }
                    if (!message.content.match(/:(c|u|r|e|m|l|f)gem4:/gm)) {
                        if (gem3sorgu === true) {
                            await channel.send("owo inv");
                            if (db.get("inventory").includes("078")) gemarr.push("78");
                            else if (db.get("inventory").includes("077")) gemarr.push("77");
                            else if (db.get("inventory").includes("076")) gemarr.push("76");
                            else if (db.get("inventory").includes("075")) gemarr.push("75");
                            else if (db.get("inventory").includes("074")) gemarr.push("74");
                            else if (db.get("inventory").includes("073")) gemarr.push("73");
                            else if (db.get("inventory").includes("072")) gemarr.push("72");
                            else {
                                console.log("gem3 yok")
                                gem3sorgu = false;
                            }
                        }
                    }
                    if (gemarr.length > 0) {
                        setTimeout(async function () {
                            await channel.send(`owo use ${gemarr.join(" ")}`)
                        }, 10 * 1000);
                    }

                }

                async function emptygemislemleri() {

                    let gemarr = [];
                    await wait(3);
                    if (!message.content.match(/:(c|u|r|e|m|l|f)gem1:/gm)) {
                        if (gem1sorgu === true) {
                            await channel.send("owo inv");
                            if (db.get("inventory").includes("057")) gemarr.push("57");
                            else if (db.get("inventory").includes("056")) gemarr.push("56");
                            else if (db.get("inventory").includes("055")) gemarr.push("55");
                            else if (db.get("inventory").includes("054")) gemarr.push("54");
                            else if (db.get("inventory").includes("053")) gemarr.push("53");
                            else if (db.get("inventory").includes("052")) gemarr.push("52");
                            else if (db.get("inventory").includes("051")) gemarr.push("51");
                            else {
                                console.log("gem1 yok")
                                gem1sorgu = false;
                            }
                        }
                    }
                    if (!message.content.match(/:(c|u|r|e|m|l|f)gem3:/gm)) {
                        if (gem2sorgu === true) {
                            if (db.get("inventory").includes("071")) gemarr.push("71");
                            else if (db.get("inventory").includes("070")) gemarr.push("70");
                            else if (db.get("inventory").includes("069")) gemarr.push("69");
                            else if (db.get("inventory").includes("068")) gemarr.push("68");
                            else if (db.get("inventory").includes("067")) gemarr.push("67");
                            else if (db.get("inventory").includes("066")) gemarr.push("66");
                            else if (db.get("inventory").includes("065")) gemarr.push("65");
                            else {
                                console.log("gem2 yok")
                                gem2sorgu = false;
                            }
                        }
                    }
                    if (!message.content.match(/:(c|u|r|e|m|l|f)gem4:/gm)) {
                        if (gem3sorgu === true) {
                            if (db.get("inventory").includes("078")) gemarr.push("78");
                            else if (db.get("inventory").includes("077")) gemarr.push("77");
                            else if (db.get("inventory").includes("076")) gemarr.push("76");
                            else if (db.get("inventory").includes("075")) gemarr.push("75");
                            else if (db.get("inventory").includes("074")) gemarr.push("74");
                            else if (db.get("inventory").includes("073")) gemarr.push("73");
                            else if (db.get("inventory").includes("072")) gemarr.push("72");
                            else {
                                console.log("gem3 yok")
                                gem3sorgu = false;
                            }
                        }
                    }
                    if (gemarr.length > 0) {
                        setTimeout(async function () {
                            await channel.send(`owo use ${gemarr.join(" ")}`)
                        }, 10 * 1000);
                    }

                }

                // GEM YOK ISE
                if (message.content.includes(`**====== ${client.user.username}'s Inventory ======**`)) db.set("inventory", clear(message.content));
                if (message.content.includes(`${client.user.username}**, hunt is empowered by`)) {
                    db.set("gems", clear(message.content.split(" by ")[1].split("  !")[0]));
                    gemislemleri();
                }

                // TAMAMEN BOŞ İSE

                if (message.content.includes(`${client.user.username}** spent 5`)) {
                        console.log("hiçbir gem kullanılmıyor")
                        emptygemislemleri();
                }

                // gem bulunmuşsa gem sorgularını sıfırlamak

                if (message.content.includes("/opens\s\d+\slootboxes/")) {
                    gem1sorgu = true
                    gem2sorgu = true
                    gem3sorgu = true
                    console.log("yeni gem bulundu, gem sorguları sıfırlandı.")
                }


            });
            /* OWO USE SYSTEM BITIS */

            /* OWO HUNT SYSTEM START */

            function sendMessage() {
                const min = 15;
                const max = 65;
                const huntdelay = Math.floor(Math.random() * (max - min + 1) + min);
                const owoitem = ['owo h', 'owo hunt', 'w h', 'w hunt'];
                let owoitemrandom = owoitem[Math.floor(Math.random() * owoitem.length)];
                if (continuefilter == true) {
                    channel.send(owoitemrandom);
                    console.log(chalk.rgb(51, 119, 255)("[AI] ") + chalk.rgb(230, 184, 0)(`HUNT COMMAND <` + owoitemrandom + '>') + chalk.green(' [+]'));
                }
                // Random delay
                setTimeout(sendMessage, huntdelay * 1000);
            }

            // komutu kullan
            sendMessage();

            /* OWO HUNT SYSTEM BITIS */

            /* OWO PRAY SYSTEM START */

            function praymessage() {
                const praymin = 5 * 60;
                const praymax = 9 * 60;
                const praydelay = Math.floor(Math.random() * (praymax - praymin + 1) + praymin);

                const prayitem = [`w pray <@${client.user.id}>`, `owo pray <@${client.user.id}>`];
                let prayitemrandom = prayitem[Math.floor(Math.random() * prayitem.length)];
                if (continuefilter == true) {
                    channel.send(prayitemrandom);
                    console.log(chalk.rgb(51, 119, 255)("[AI] ") + chalk.rgb(230, 184, 0)(`PRAY COMMAND <` + "owo pray" + '>') + chalk.green(' [+]'));
                }
                // Random delay
                setTimeout(praymessage, praydelay * 1000);
            }

            
            praymessage();
            /* OWO PRAY SYSTEM BITIS */

            /* OWO RANDOM COMMAND SYSTEM START */

            function randomowomessage() {
                const randomowomin = 10;
                const randomowomax = 250;
                const randomowodelay = Math.floor(Math.random() * (randomowomax - randomowomin + 1) + randomowomin);

                const randomowoitem = ['owo top', 'owo my', 'owo help', 'owo quest', 'owo checklist', 'owo shop', 'owo ping',
                    'owo guildlink', 'owo link', 'owo patreon', 'owo announcement',
                    'owo rules', 'owo color', 'owo level', 'owo zoo', 'owo inv', 'owo lb all', 'owo crate all'];
                let randomowoitemrandom = randomowoitem[Math.floor(Math.random() * randomowoitem.length)];
                if (continuefilter == true) {
                    channel.send(randomowoitemrandom);
                    console.log(chalk.rgb(51, 119, 255)("[AI] ") + chalk.rgb(230, 184, 0)(`RANDOM OWO COMMAND <` + randomowoitemrandom + '>') + chalk.green(' [+]'));
                }
                
                setTimeout(randomowomessage, randomowodelay * 1000);
            }


            randomowomessage();

            /* OWO RANDOM COMMAND SYSTEM BITIS */



            /* OWO QUEST PROCESS */




        });
    }



});

client.login("x")
