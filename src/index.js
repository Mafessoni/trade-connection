const chokidar = require("chokidar");
const fs = require("fs");
const md5 = require("md5");
const nodemailer = require("nodemailer");
var robot = require("robotjs");

const Discord = require("discord.js");
const client = new Discord.Client();
let channel = null;

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  channel = await client.channels.fetch("822208956306161698");
});

client.on("message", (msg) => {
  if (msg.content.indexOf("@everyone De:") != -1) {    
    var mensagem = msg.content.split(" ");

    if ((mensagem[13] >= 2) && (mensagem[14] == "exalted")) { 
/*      
      for (var i = 0; i < mensagem.length; i++) {
        console.log(mensagem[i]);
      }
*/      
      robot.keyTap("enter");    
      var whisper = "";
      if (mensagem[3].indexOf("<") != -1){
        whisper = mensagem[4]
      }
      else whisper = mensagem[3];    
      
      robot.setKeyboardDelay(1);
      robot.typeString("@" + whisper.replace(":",'') + " Hi, wait a minute. I'm busy.");    
    
      // Press enter.
      robot.keyTap("enter");
  }
  }
  //Para responder uma mensagem qualquer
  if (msg.content.startsWith("!responder")) {
    robot.keyTap("enter");
    const arr = msg.content.split(" ");
    arr.shift();
    var whisper = arr.shift();
    var mensagem = msg.content.split(" ");
    if (mensagem[0].indexOf("<") != -1) {
      whisper = mensagem[0];
    } else {
      whisper = mensagem[1];
    }
    console.log(whisper);
    robot.setKeyboardDelay(1);
    robot.typeString(" @"+whisper.toString()+' '+ arr.join(" "));
    robot.keyTap("enter");
  }  
  if (msg.content === "ping") {
    robot.typeString("pong");
    // Press enter.
    robot.keyTap("enter");
  }
});

client.login("ODIyMjA3Nzc4NzQ2OTI1MTQ2.YFO6qg.xgn7Avi-363HLYwiJBEAV1MR7q8");

let conteudo_anterior = "";
//let arquivo = "./arquivo.txt";
let arquivoTrade = "C:/Program Files (x86)/Steam/steamapps/common/Path of Exile/logs/ClientTrade.txt";
let arquivo = "C:/Program Files (x86)/Steam/steamapps/common/Path of Exile/logs/Client.txt";

let fsWait = false;
fs.watch(arquivo, (event, filename) => {
  //if (filename) {
  if (fsWait) return;
  fsWait = setTimeout(() => {
    fsWait = false;
  }, 500);

  if (fs.existsSync(arquivo)) {
    fs.readFile(arquivo, { encoding: "utf-8" }, async function (err, data) {
      if (!err) {
        fs.writeFileSync(arquivoTrade, data, { encoding: "utf-8" });
        //fs.readFile(arquivo, { encoding: "utf-8" }, async function (err, data) {
        //if (!err) {
        let linhas = data.trim().split("\n");
        let ultima = linhas.slice(-1)[0];
        let str = ultima;
        //let regexp = /^(.*\s)?(.+), (.+ to buy your\s+?(.+?)(\s+?listed for\s+?([\d\.]+?)\s+?(.+))?\s+?in\s+?(.+?)\s+?\(stash tab \"(.*)\"; position: left (\d+), top (\d+)\)\s*?(.*))$/;
        let regexp = /^(.*@)(.*\s)?(.*), (.+ to buy your\s+?(.+?)(\s+?listed for\s+?([\d\.]+?)\s+?(.+))?\s+?in\s+?(.+?)\s+?\(stash tab \"(.*)\"; position: left (\d+), top (\d+)\)\s*?(.*))$/;

        let matchAll = str.match(regexp);

        if (matchAll) {
          conteudo_anterior = ultima;

          let body =
            `De: ${matchAll[2]} Quer comprar: ${matchAll[5]} Por: ${matchAll[7]} ${matchAll[8]} Liga: ${matchAll[9]} Stash: ${matchAll[10]} Left: ${matchAll[11]} Top: ${matchAll[12]}`;

          channel.send(`@everyone ${body}`);
          /*
          let transporter = nodemailer.createTransport({
            host: "smtp.kinghost.net",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "ti@xpert.com.br", // generated ethereal user
              pass: "Tiasd123", // generated ethereal password
            },
          });

          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: "otavio@xpert.com.br", // sender address
            to: "otavio@xpert.com.br", // list of receivers
            subject: "Trade Connection ✔", // Subject line
            text: "Trade", // plain text body
            html: "<b>" + body + "</b>", // html body
          });
*/
        }
      }
    });
  }
});
