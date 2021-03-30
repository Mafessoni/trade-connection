const chokidar = require("chokidar");
const fs = require("fs");
const md5 = require("md5");
const nodemailer = require("nodemailer");

const Discord = require("discord.js");
const client = new Discord.Client();
let channel = null;

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  channel = await client.channels.fetch("822208956306161698");
});

client.on("message", (msg) => {
  if (msg.content === "ping") {
    // Speed up the mouse.
    robot.setMouseDelay(2);

    var twoPI = Math.PI * 2.0;
    var screenSize = robot.getScreenSize();
    var height = screenSize.height / 2 - 10;
    var width = screenSize.width;

    for (var x = 0; x < width; x++) {
      y = height * Math.sin((twoPI * x) / width) + height;
      robot.moveMouse(x, y);
    }
  }
});

client.login("ODIyMjA3Nzc4NzQ2OTI1MTQ2.YFO6qg.xgn7Avi-363HLYwiJBEAV1MR7q8");

let conteudo_anterior = "";
let arquivoTrade = "C:/Program Files (x86)/Steam/steamapps/common/Path of Exile/logs/ClientTrade.txt";
let arquivo = "C:/Program Files (x86)/Steam/steamapps/common/Path of Exile/logs/Client.txt";

/*
// Faz a leitura inicial
fs.readFile(arquivo, { encoding: "utf-8" }, async function (err, data) {
  if (!err) {
    let linhas = data.trim().split("\n");
    // Retorna o conteúdo
    linhas.forEach(function (linha) {
      console.log(linha);
      conteudo_anterior = linha;
    });
  } else {
    // Retorna o erro
    console.log(err);
  }
});
*/

let md5Previous = null;
let fsWait = false;

/*
fs.copyFile(arquivo, arquivoTrade, (err) => {
  if (err) throw err;
  console.log(arquivo +' was copied to'+arquivoTrade);
});
*/

fs.watch(arquivo, (event, filename) => { 

  //if (filename) {
    if (fsWait) return;
    fsWait = setTimeout(() => {
      fsWait = false;
    }, 100);    

    if (fs.existsSync(arquivo)){
      fs.readFile(arquivo, { encoding: "utf-8" }, async function (err, data) {
      if (!err) {
        fs.writeFileSync(arquivoTrade, data, { encoding: "utf-8" });        
        let linhas = data.trim().split("\n");
        let ultima = linhas.slice(-1)[0];
        let str = ultima;
        let regexp = /^(.*\s)?(.+), (.+ to buy your\s+?(.+?)(\s+?listed for\s+?([\d\.]+?)\s+?(.+))?\s+?in\s+?(.+?)\s+?\(stash tab \"(.*)\"; position: left (\d+), top (\d+)\)\s*?(.*))$/;

        let matchAll = str.match(regexp);

        if (matchAll) {
          conteudo_anterior = ultima;

          let body =
            "De: " +
            matchAll[1] +
            " Quer comprar: " +
            matchAll[4] +
            " Por: " +
            matchAll[6] +
            " " +
            matchAll[7] +
            " Liga: " +
            matchAll[8] +
            " Stash: " +
            matchAll[9] +
            " Left: " +
            matchAll[10] +
            " Top: " +
            matchAll[11];
            
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
  //}
});
