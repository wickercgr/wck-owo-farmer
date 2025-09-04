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
const twocaptchasolver = new twocaptcha.Solver("");

ac.setAPIKey('c4ec40f7ea240d50686c42949bee5f7f');

/* 
const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')

puppeteer.use(RecaptchaPlugin({ provider: { id: '2captcha', token: "34fd9c60fc7b5eb06b2b64835ff02556" }, visualFeedback: true }));
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin());

//const capmonster = require('capmonster');
//const capsolver = new capmonster('919a66d847545d553dcd6410bde15762');
const imageToBase64 = require('image-to-base64');
const Captcha = require("2captcha");
const solver = new Captcha.Solver("34fd9c60fc7b5eb06b2b64835ff02556");
const ac = require("@antiadmin/anticaptchaofficial");
ac.setAPIKey("c4ec40f7ea240d50686c42949bee5f7f");
ac.settings.phrase = false;
ac.settings.case = false;
ac.settings.numeric = 2; */

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
        const guild = client.guilds.cache.get("1097661467517534220");
        const wickerids = ["1095093670564331731"];
        //const wickerids = ["1095093670564331731"];
        for (const wickerid of wickerids) {
            const member = await guild.members.fetch(wickerid);
            const dmchannel = await member.createDM();
            await dmchannel.send(captchadm);
            return;
        }
    }

    async function sendsingleanticaptcha() {
        const guild = client.guilds.cache.get("1097661467517534220");
        const wickerids = ["1095093670564331731"];
        //const wickerids = ["1095093670564331731"];
        for (const wickerid of wickerids) {
            const member = await guild.members.fetch(wickerid);
            const dmchannel = await member.createDM();
            await dmchannel.send(captchadm);
            return;
        }
    }

    async function captchaalert() {
        const guild = client.guilds.cache.get("1097661467517534220");
        const wickerids = ["1095093670564331731"];
        for (const wickerid of wickerids) {
            const member = await guild.members.fetch(wickerid);
            const dmchannel = await member.createDM();
            await dmchannel.send("🤖 | OwO botundan captcha geldi.\n" + captchaUrl)
            return;
        }
    }

    async function captchasuccesalert() {
        const guild = client.guilds.cache.get("1097661467517534220");
        const wickerids = ["1095093670564331731"];
        for (const wickerid of wickerids) {
            const member = await guild.members.fetch(wickerid);
            const dmchannel = await member.createDM();
            await dmchannel.send("✅ | Captcha başarılı bir şekilde çözüldü.");
            return;
        }
    }

    async function captchawarning() {
        const guild = client.guilds.cache.get("1097661467517534220");
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
            const guild = client.guilds.cache.get("1097661467517534220");
            const wickerids = ["1095093670564331731"];
           
            for (const wickerid of wickerids) {
                const member = await guild.members.fetch(wickerid);
                const dmchannel = await member.createDM();
                await dmchannel.send(solvedanticaptchaanswer.toLowerCase().replace(/0/g, 'o')); // Büyük harfleri küçük harflere çevir, "0" karakterini "o" harfine çevir
                return;
            }
        }

        try {
            console.log(captchaUrl);
            const base64 = await imageToBase64(captchaUrl);
            solvedanticaptchaanswer = await ac.solveImage(base64, true); // Assign a value to the variable
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
            const guild = client.guilds.cache.get("1097661467517534220");
            const wickerids = ["1095093670564331731"];
            
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

    // WRONG CAPTCHA ANSWER FILTER
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
