import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html'
})

export class AppComponent {
	var http = require('http');
var fs = require('fs');
var Jimp = require('jimp');
//var config = require('./config');
const token = process.env.TOKEN;//||config.TOKEN;
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, {polling: true});
var MongoClient = require('mongodb').MongoClient;
var random = require('random-name');
var url = process.env.URL;//||config.URL;//cadena de conexion
var base = "hrgvbot";
var jugadores = [];//lista de jugadores general
var lastLog = "Logs: ";//variable donde guardo los logs de la sesion
var barra = "";//mi barra separadora para diferenciar consultas
var map = [["⬜","⬜","⬜","⬜","⬜","⬜"],["⬜","⬜","⬜","⬜","⬜","⬜"],["⬜","⬜","⬜","⬜","⬜","⬜"],
           ["⬜","⬜","⬜","⬜","⬜","⬜"],["⬜","⬜","⬜","⬜","⬜","⬜"],["⬜","⬜","⬜","⬜","⬜","⬜"]];
           
var imageData = [
  [ 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF ],
  [ 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF ],
  [ 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF ],
  [ 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF ],
  [ 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF ],
  [ 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF ]
];
//metodo para insertar datos en una coleccion

bot.onText(/\/insert (.+)/, function insertText(msg, match) {
    const opts = {
            reply_to_message_id: msg.message_id
        };
    const resp = match[1];//para recoger el valor del comando en una variable
    if(msg.from.username==undefined){
        bot.sendMessage(msg.chat.id, msg.from.first_name+" ponte un alias ¬¬", opts);
        //En caso de que el usuario no tenga alias, paso de el
    }
    else{
        MongoClient.connect(url, function(err, db) {
            if (err) {
                lastLog += "\n" + cogerHora() + " ☠ @" + msg.from.username + " no conectado";
                console.log("☠ @" + msg.from.username + " no conectado");
            }
            lastLog += "\n" + cogerHora() + " ✓ @" + msg.from.username + " conectado";
            console.log("✓ @" + msg.from.username + " conectado"); 

            var dbo = db.db(base);
            var myobj = { name: msg.from.username, word: resp };

            dbo.createCollection(msg.from.username, function(err, res) {
                if (err) {
                    lastLog += "\n" + cogerHora() + " ☠ Col. " + msg.from.username + " no existente";
                    console.log("☠ Col. " + msg.from.username + " no existente");
                    //si no existe mi coleccion, la creo yo
                    lastLog += "\n" + cogerHora() + " ✓ Col. " + msg.from.username + " creada";
                    console.log("✓ Col. " + msg.from.username + " creada");
                }
                else {
                    lastLog += "\n" + cogerHora() + " ✓ Col. " + msg.from.username + " existente";
                    console.log("✓ Col. " + msg.from.username + " existente");
                }
            });

            dbo.collection(msg.from.username).insertOne(myobj, function(err, res) {
            if (err) {
                lastLog += "\n" + cogerHora() + " ☠ @" + msg.from.username +" no pudo insertar " + resp;
                console.log("☠ @" + msg.from.username +" no pudo insertar " + resp);
            }
            lastLog += "\n" + cogerHora() + " ✓ @"+msg.from.username+" insertó " + resp;
            console.log("✓ @"+msg.from.username+" inserto " + resp);
            db.close();
            lastLog += "\n" + cogerHora() + " ✓ @"+msg.from.username+" desconectado";
            console.log("✓ @"+msg.from.username+" desconectado");
            lastLog += "\n" +barra;
            console.log(barra);
          });
        });
        bot.sendMessage(msg.chat.id, "Insertado en la base de datos", opts);
    }
});

//Metodo para eliminar una coleccion
bot.onText(/\/relog/, (msg) => {
    lastLog="";
});

//Metodo para eliminar una coleccion
bot.onText(/\/drop/, (msg) => {
    const opts = {
            reply_to_message_id: msg.message_id
        };
    if(msg.from.username==undefined){
        bot.sendMessage(msg.chat.id, msg.from.first_name + " ponte un alias ¬¬", opts);
    }
    else{
        MongoClient.connect(url, function(err, db) {
            if (err) {
                lastLog += "\n" + cogerHora() + " ☠ @" + msg.from.username + " no conectado";
                console.log("☠ @" + msg.from.username + " no conectado");
            }
            lastLog += "\n" + cogerHora() + " ✓ @" + msg.from.username + " conectado";
            console.log("✓ @" + msg.from.username + " conectado"); 

            var dbo = db.db(base);

            dbo.collection(msg.from.username).drop(function(err, delOK) {
                if (err){
                    lastLog += "\n" + cogerHora() + " ☠ Col. " + msg.from.username + " no existente";
                    console.log("☠ Col. " + msg.from.username + " no existente");
                }
                if (delOK) lastLog += "\n" + cogerHora() + " ✓ Col. " +msg.from.username + " borrada"; console.log("✓ Col. " +msg.from.username + " borrada");
                db.close();
                lastLog += "\n" + cogerHora() + " ✓ @"+msg.from.username+" desconectado";
                console.log("✓ @"+msg.from.username+" desconectado");
                lastLog += "\n" +barra;
                console.log(barra);
            });
        });
        bot.sendMessage(msg.chat.id,"Col. " + msg.from.username + " borrada", opts);
    }
});

//Consulta para sacar todos los datos de la coleccion
bot.onText(/\/find/, (msg) => {
    const opts = {
            reply_to_message_id: msg.message_id
        };
    if(msg.from.username==undefined){
        bot.sendMessage(msg.chat.id, msg.from.first_name + " ponte un alias ¬¬", opts);
    }
    else{
        MongoClient.connect(url, function(err, db) {
          if (err) {
                lastLog += "\n" + cogerHora() + " ☠ @" + msg.from.username + " no conectado";
                console.log("☠ @" + msg.from.username + " no conectado");
            }
            lastLog += "\n" + cogerHora() + " ✓ @" + msg.from.username + " conectado";
            console.log("✓ @" + msg.from.username + " conectado"); 

            var dbo = db.db(base);

            dbo.createCollection(msg.from.username, function(err, res) {
                if (err) {
                    lastLog += "\n" + cogerHora() + " ☠ Col. " + msg.from.username + " no existente";
                    console.log("☠ Col. " + msg.from.username + " no existente");
                    lastLog += "\n" + cogerHora() + " ✓ Col. " + msg.from.username + " creada";
                    console.log("✓ Col. " + msg.from.username + " creada");
                }
                else {
                    lastLog += "\n" + cogerHora() + " ✓ Col. " + msg.from.username + " existente";
                    console.log("✓ Coleccion " + msg.from.username + " existente");
                }
            });

            dbo.collection(msg.from.username).find({}).toArray(function(err, result) {
                if (err) {
                    lastLog += "\n" + cogerHora() + " ☠ Ningun dato encontrado";
                    console.log("☠ Ningun dato encontrado");
                }
                var cadena = "";
                for (var i = result.length - 1; i >= 0; i--) {
                    cadena += i + " - " + result[i].word + "\n";
                }
                bot.sendMessage(msg.chat.id, cadena, opts);
                lastLog += "\n" + cogerHora() + " ✓ @"+msg.from.username+" consultó " + result.length + " datos";
                console.log("✓ @"+msg.from.username+" consultó " + result.length + " datos");
                db.close();
                lastLog += "\n" + cogerHora() + " ✓ @"+msg.from.username+" desconectado";
                console.log("✓ @"+msg.from.username+" desconectado");
                lastLog += "\n" +barra;
                console.log(barra);
            });
        });
    }
});

//Acciones que hace el bot leyendo el texto del chat
bot.on('message', (msg) => {
    /*if (msg.photo != undefined){
        console.log(msg.photo);
        console.log(msg.photo[0].file_id); // get worst quality photo file id
        //console.log(msg.photo[3].file_id); // get better quality photo file id (not always set)
        //bot.downloadFile(msg.photo[3].file_id, "img/");
        //console.log(msg.photo[0].file_path);
        //var path = msg.photo[0].file_path;
        //var url = "https://api.telegram.org/file/bot"+token+"/"+path;
        
    }*/

    //Palabras prohibidas
    var Hi = "hola";
    var bye = "adios";
    var bye2 = "chao";
    var censura = "ramon";
    var censura1 = "ramón";
    var censura2 = "rabon";
    var censura3 = "rabón";
    var censura4 = "nomar";
    var censura5 = "monra";
    var arriba = "↑";
    var abajo = "↓";
    var izquierda = "←";
    var derecha = "→";

    //Arriba
    if (msg.text.toString().indexOf("🔴") === 0){
        bot.deleteMessage(msg.chat.id, msg.message_id);
        for (var i = 3 - 1; i >= 0; i--) {
            var index=map[i].indexOf("x");
            if(index!=-1){
                map[i][index]="o";
                map[i-1][index];
            }
        }
    } 

    //Decir hola a alguien
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id,"hola, "+msg.chat.id);
        lastLog += "\n" + cogerHora() + " ✓ Dije hola a @" + msg.from.username;
        console.log("✓ Dije hola a @" + msg.from.username);
        lastLog += "\n" +barra;
        console.log(barra);
    }   

    //Decir adios en general
    if (msg.text.toString().toLowerCase().includes(bye)) {
        lastLog += "\n"+cogerHora()+" ✓ Dije adios";
        console.log("✓ Dije adios");
        lastLog += "\n" +barra;
        console.log(barra);
    }

    //Decir adios a alguien en especial
    if (msg.text.toString().toLowerCase().includes(bye2)) {
        lastLog += "\n" +cogerHora() + " ✓ Dije adios a @" + msg.from.username;
        console.log("✓ Dije adios a " + msg.from.username);
        lastLog += "\n" +barra;
        console.log(barra);
    }

    //Eliminar un mensaje que contenga una palabra prohibida
    if (   msg.text.toString().toLowerCase().includes(censura )
        || msg.text.toString().toLowerCase().includes(censura1)
        || msg.text.toString().toLowerCase().includes(censura2)
        || msg.text.toString().toLowerCase().includes(censura3)
        || msg.text.toString().toLowerCase().includes(censura4)
        || msg.text.toString().toLowerCase().includes(censura5) ) {
        //bot.kickChatMember(msg.chat.id,  msg.from.id);
        bot.deleteMessage(msg.chat.id, msg.message_id);
        lastLog += "\n" +cogerHora() + " ✓ Borré " + msg.text + " de " + msg.chat.title + " a @" +msg.from.username;
        console.log("✓ Borré " + msg.text + " de " + msg.chat.title + " a @" +msg.from.username);
        lastLog += "\n" +barra;
        console.log(barra);
    }

});

//Acciones del bot cuando alguien edita un mensaje
bot.on('edited_message', (msg) =>{
    const opts = {
            reply_to_message_id: msg.message_id
        };
    console.log(msg.edited_message);
    bot.sendMessage(msg.chat.id, "Mensaje editado por @" + msg.from.username, opts);
    lastLog += "\n" + cogerHora() + " ✓ Mensaje editado por @" + msg.from.username + " a " + msg.text;
    console.log("✓ Mensaje editado por @" + msg.from.username + " a " + msg.text);
    lastLog += "\n" +barra;
    console.log(barra);
});

//Accion en respuesta al comando start = arrancar    
bot.onText(/\/start/, (msg) => {
    //bot.sendMessage(msg.chat.id, " ");
    lastLog += "\n" + cogerHora() + " ✓ Me arrancaró @" + msg.from.username;
    console.log("✓ Me arrancaró @" + msg.from.username);
    lastLog += "\n" +barra;
    console.log(barra);   
});

//Accion en respuesta al comando guy = nuevo sujeto    
bot.onText(/\/guy (.+)/, function onEchoText(msg, match) {
    const opts = {
            reply_to_message_id: msg.message_id
        };
    const resp = match[1];
    for (var i = resp - 1; i >= 0; i--) {
        jugadores.push(random.first()+"_bot");
    }
    jugadores = removeDuplicates(jugadores);
    bot.sendMessage(msg.chat.id, "Metí " + resp +" bots en la lista", opts);
    lastLog += "\n" + cogerHora() + " ✓ Metí " + resp +" bots en la lista";
    console.log("✓ Metí " + resp + " bots en la lista");
    lastLog += "\n" +barra;
    console.log(barra);   
});
//Accion en respuesta al comando oust = salir
bot.onText(/\/oust/, (msg) => {
    const opts = {
            reply_to_message_id: msg.message_id
        };
    bot.sendMessage(msg.chat.id, "Me voy porque yo quiero, no os vengais arriba", opts);
    bot.leaveChat(msg.chat.id);
    lastLog += "\n" + cogerHora() + " ✓ Me fui del grupo " + msg.chat.title;
    console.log("✓ Me fui del grupo " + msg.chat.title);
    lastLog += "\n" +barra;
    console.log(barra);   
});

//Accion en respuesta al comando join = meter al usuario en la lista de jugadores
bot.onText(/\/join/, (msg) => {
    const opts = {
            reply_to_message_id: msg.message_id
        };
    if(msg.from.username==undefined) {
        bot.sendMessage(msg.chat.id, msg.from.first_name + " ponte un alias ¬¬", opts);
    }
    else {
        jugadores.push(msg.from.username);
        bot.sendMessage(msg.chat.id,"Te has unido a la lista, @" + msg.from.username, opts);
        jugadores = removeDuplicates(jugadores);
        lastLog += "\n" + cogerHora() + " ✓ Metí a @" + msg.from.username + " a la lista";
        console.log("✓ Metí a @" + msg.from.username + " a la lista");
        lastLog += "\n" +barra;
        console.log(barra);
    }
    
});

//Accion en respuesta al comando exit = salir de la lista de jugadores
bot.onText(/\/exit/, (msg) => {
    const opts = {
            reply_to_message_id: msg.message_id
        };
    if(msg.from.username==undefined) {
        bot.sendMessage(msg.chat.id, msg.from.first_name + " ponte un alias ¬¬", opts);
    }
    else {
        var index = jugadores.indexOf(msg.from.username);
        if (index !== -1) jugadores.splice(index, 1);
        bot.sendMessage(msg.chat.id,"Has salido de la lista, @" + msg.from.username, opts);
        lastLog += "\n" + cogerHora() + " ✓ Saqué a @" + msg.from.username + " de la lista";
        console.log("✓ Saqué a @" + msg.from.username + " de la lista");
        lastLog += "\n" +barra;
        console.log(barra);
    }
});

//Accion en respuesta al comando list = mostrar lista de jugadores
bot.onText(/\/list/, (msg) => {
    const opts = {
        reply_to_message_id: msg.message_id
    };
    bot.sendMessage(msg.chat.id, jugadores.length + " Jugadores:\n@" + jugadores.join(" @"), opts);
    lastLog += "\n" + cogerHora() + " ✓ Mostré la lista de jugadores";
    console.log("✓ Mostré la lista con " + jugadores.length + " jugadores");
    lastLog += "\n" +barra;
    console.log(barra);
});

//Accion de desarrollador en respuesta al comando log = envia el log de la sesion
bot.onText(/\/log/, (msg) => {
    bot.sendMessage(396528052, lastLog);
});

//Ver tus stats
bot.onText(/\/stats/, (msg) => {
    const opts = {
            reply_to_message_id: msg.message_id
        };
    if(msg.from.username==undefined) {
        bot.sendMessage(msg.chat.id, msg.from.first_name + " ponte un alias ¬¬", opts);
    }
    else {
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db(base);
          var query = { nombre: msg.from.username };
          dbo.collection("stats").find(query).toArray(function(err, result) {
            if (err) throw err;
            bot.sendMessage(msg.chat.id, "Puntos: " + result[0].puntos, opts);
            db.close();
            lastLog += "\n" + cogerHora() + " ✓ Mostré la puntuacion de @" + msg.from.username;
            console.log("✓ Mostré la puntuacion de @" + msg.from.username);
            lastLog += "\n" +barra;
            console.log(barra);
          });
        });
    }
});


    //Ver top stats
bot.onText(/\/top (.+)/, function onGrabNum(msg, match) {
    const opts = {
            reply_to_message_id: msg.message_id
        };
    const num = parseInt(match[1]);
    if(msg.from.username==undefined) {
        bot.sendMessage(msg.chat.id, msg.from.first_name + " ponte un alias ¬¬", opts);
    }
    else {
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db(base);
          var mysort = { puntos: -1 };
          dbo.collection("stats").find().sort(mysort).limit(num).toArray(function(err, result) {
            if (err) throw err;
            var cadena="top "+match[0]+"\n";
            result.reverse();
            var cont=0;
            for (var i = num - 1; i >= 0; i--) {
                cont++;
                cadena+=cont+". @"+result[i].nombre+": "+result[i].puntos+"pts\n";
            }   
            bot.sendMessage(msg.chat.id,cadena,opts);
            db.close();
          });
        });
    }
});
//Ver top stats
bot.onText(/\/comandos/, (msg) => {
    const opts = {
            reply_to_message_id: msg.message_id
        };
    if(msg.from.username==undefined) {
        bot.sendMessage(msg.chat.id, msg.from.first_name + " ponte un alias ¬¬", opts);
    }
    else {
        bot.sendMessage(msg.chat.id, "/comandos\n/paint\n/show\n/join\n/exit\n/topTen\n/top\n/stats\n/log\n/relog\n/list\n"+
                                     "/rr\n/guy\n/find\n/insert\n/drop\n/reset", opts);
    }
});
//Ver top stats
bot.onText(/\/topTen/, (msg) => {
    const opts = {
            reply_to_message_id: msg.message_id
        };
    if(msg.from.username==undefined) {
        bot.sendMessage(msg.chat.id, msg.from.first_name + " ponte un alias ¬¬", opts);
    }
    else {
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db(base);
          var mysort = { puntos: -1 };
          dbo.collection("stats").find().sort(mysort).limit(10).toArray(function(err, result) {
            if (err) throw err;
            var cadena="top 10\n";
            result.reverse();
            var cont=0;
            for (var i = 10 - 1; i >= 0; i--) {
                cont++;
                cadena+=cont+". @"+result[i].nombre+"\n"+result[i].puntos+"pts\n\n";
            }   
            bot.sendMessage(msg.chat.id,cadena,opts);
            db.close();
          });
        });
    }
});
//Juego ruleta rusa
bot.onText(/\/paint/,function onTank(msg) {
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: map[0][0],callback_data: '1'},
                    {text: map[0][1],callback_data: '2'},
                    {text: map[0][2],callback_data: '3'},
                    {text: map[0][3],callback_data: '4'},
                    {text: map[0][4],callback_data: '5'},
                    {text: map[0][5],callback_data: '6'}
                ],
                [
                    {text: map[1][0],callback_data: '7'},
                    {text: map[1][1],callback_data: '8'},
                    {text: map[1][2],callback_data: '9'},
                    {text: map[1][3],callback_data: '10'},
                    {text: map[1][4],callback_data: '11'},
                    {text: map[1][5],callback_data: '12'}
                ],
                [
                    {text: map[2][0],callback_data: '13'},
                    {text: map[2][1],callback_data: '14'},
                    {text: map[2][2],callback_data: '15'},
                    {text: map[2][3],callback_data: '16'},
                    {text: map[2][4],callback_data: '17'},
                    {text: map[2][5],callback_data: '18'}
                ],
                [
                    {text: map[3][0],callback_data: '19'},
                    {text: map[3][1],callback_data: '20'},
                    {text: map[3][2],callback_data: '21'},
                    {text: map[3][3],callback_data: '22'},
                    {text: map[3][4],callback_data: '23'},
                    {text: map[3][5],callback_data: '24'}
                ],
                [
                    {text: map[4][0],callback_data: '25'},
                    {text: map[4][1],callback_data: '26'},
                    {text: map[4][2],callback_data: '27'},
                    {text: map[4][3],callback_data: '28'},
                    {text: map[4][4],callback_data: '29'},
                    {text: map[4][5],callback_data: '30'}
                ],
                [
                    {text: map[5][0],callback_data: '31'},
                    {text: map[5][1],callback_data: '32'},
                    {text: map[5][2],callback_data: '33'},
                    {text: map[5][3],callback_data: '34'},
                    {text: map[5][4],callback_data: '35'},
                    {text: map[5][5],callback_data: '36'}
                ]
            ]
        }
    };
    bot.sendMessage(msg.chat.id,"Dibuja aqui, despues reenvia el mensaje si quieres\n");
    bot.sendMessage(msg.chat.id,map[0].join("")+"\n"+map[1].join("")+"\n"+map[2].join("")+"\n"+
                                map[3].join("")+"\n"+map[4].join("")+"\n"+map[5].join("")+"\n", opts);
});

bot.onText(/\/show/, (msg)=> {
    const opts = {
            reply_to_message_id: msg.message_id
        };
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(base);
      dbo.collection("paints").find({}).toArray(function(err, result) {
        if (err) throw err;
        var mape = result[Math.floor((Math.random() * result.length) + 0)].data;
        bot.sendMessage(msg.chat.id,mape[0].join("")+"\n"+mape[1].join("")+"\n"+mape[2].join("")+"\n"+
                            mape[3].join("")+"\n"+mape[4].join("")+"\n"+mape[5].join("")+"\n");
        db.close();
      });
    });
});

//Reset stats
bot.onText(/\/reset/, (msg)=> {
    const opts = {
            reply_to_message_id: msg.message_id
        };
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(base);
      var myquery = { puntos: {$gt:0} };
      var newvalues = {$set: {puntos: 0} };
      dbo.collection("stats").updateMany(myquery, newvalues, function(err, res) {
        if (err) throw err;
        bot.sendMessage(msg.chat.id,res.result.nModified + " reseteados",opts);
        console.log("✓ "+res.result.nModified + " reseteados");
        db.close();
      });
    });
});
//Juego ruleta rusa
bot.onText(/\/rr/,function onEditableText(msg) {
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Iniciar',
                        callback_data: 'edit'
                    }
                ]
            ]
        }
    };
    bot.sendMessage(msg.chat.id, jugadores.length+" jugadores", opts);
});
bot.onText(/\/executeOrder66 (.+)/, function onGrabScum(msg, match) {
    //console.log(msg.entities[1].user.id);
    //var fotos=bot.getUserProfilePhotos(msg.entities[1].user.id);
    //bot.sendPhoto(msg.chat.id, fotos.photos[0]);
    //bot.kickChatMember(msg.chat.id,match[1]);
    //bot.sendMessage(msg.chat.id,msg.entities[1]);
});
// Matches /photo
bot.onText(/\/photo/, (msg)=> {
    promise=new Promise(resolve => {
        for (var i = 6 - 1; i >= 0; i--) {
            for (var o = 6 - 1; o >= 0; o--) {
                if(map[i][o]=="⬜"){
                    imageData[i][o]=0xFFFFFFFF;
                }
                else{
                    imageData[i][o]=0x000000FF;
                }
            }
        }
        var imgr=scaleArray(imageData,30);
        var image = new Jimp(180, 180, function (err, image) {
          if (err) throw err;

          imgr.forEach((row, y) => {
            row.forEach((color, x) => {
              image.setPixelColor(color, x, y);
            });
          });
          image.write('test.png', (err) => {
            if (err) throw err;
          });
        });
        resolve();
    }).then(_ => {
      bot.sendPhoto(msg.chat.id, "test.png");
    }).catch(err => {
      console.log(err);
    });
});
/*bot.on('polling_error', (error) => {
  console.log(error.code);
});*/
/*bot.on('photo', (msg)=> {
    var id=msg.photo.file_id;
    var max_file_size = 1000;
    bot.getFile(id).then(function (resp) {
        if (resp.file_size < max_file_size){
            bot.downloadFile(id, "img/").then(function (resp) {
                // downloaded
                console.log("descargado "+id);
            });
        }else{
            // too large
        }
    });
    var file="https://api.telegram.org/file/bot"+token+"/"+msg.file_path;
    var newFile = fs.createWriteStream("img/"+fotos+".jpg");
    fotos++;
    var request = http.get(file, function(response) {
        response.pipe(newFile);
    });
});*/

bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id
    };
    let text;
    if (action === 'edit') {
        text = 'Iniciando...';
    if(jugadores.length>=2) {
        lastLog += "\n" + cogerHora() + " ✓ Iniciando ruleta...";
        console.log("✓ Iniciando ruleta...");
        var rrsv2 = jugadores;
        var total = rrsv2.length;
        function myLoop () {
            setTimeout(function () {
                var puesto = total-rrsv2.length;
                var shotv2 = Math.floor((Math.random() * rrsv2.length) + 0);
                bot.editMessageText("En partida:\n"+
                                    "Ronda "+(puesto+1)+"\n"+
                                    "@"+rrsv2[shotv2]+" se volo la cabeza\n"+
                                    "Ganó " + (puesto*puesto) + " pts\n"+
                                    "Jugadores restantes "+(rrsv2.length-1),opts);
                saveStats(rrsv2[shotv2],puesto*puesto);
                saveStats("RGVylar",1);
                console.log("✓ "+rrsv2[shotv2] + " ganó " + (puesto*puesto) + " puntos");
                lastLog += "\n" + cogerHora() + " ✓ @" + rrsv2[shotv2] + " murio";
                console.log("☠ @" + rrsv2[shotv2] + " murio");
                rrsv2.splice(shotv2,1);
                if(rrsv2.length<=1){
                    saveStats(rrsv2[0],puesto*puesto+1);
                    bot.editMessageText("Final: @"+rrsv2[0] + " ganó la partida con " + (puesto*puesto+1) + " puntos",opts);
                    lastLog += "\n" + cogerHora() + " ✓ @"+rrsv2[0] + " ganó";
                    console.log("✓ @"+rrsv2[0] + " ganó");
                    lastLog += "\n" +barra;
                    console.log(barra);
                    rrsv2 = [];
                }
                if (rrsv2.length>1) {   
                        myLoop();             
                }
            }, 1000)
          }
    }
    
    else {
        bot.sendMessage(msg.chat.id,"No hay suficiente gente para jugar", opts);
    }
    myLoop();
    }
    if (action ===  '1'||action ===  '2'||action ===  '3'||action ===  '4'||action ===  '5'||action ===  '6'||
        action ===  '7'||action ===  '8'||action ===  '9'||action === '10'||action === '11'||action === '12'||
        action === '13'||action === '14'||action === '15'||action === '16'||action === '17'||action === '18'||
        action === '19'||action === '20'||action === '21'||action === '22'||action === '23'||action === '24'||
        action === '25'||action === '26'||action === '27'||action === '28'||action === '29'||action === '30'||
        action === '31'||action === '32'||action === '33'||action === '34'||action === '35'||action === '36'||
        action === '37'){

        if(action=== '1'){reverse(0,0)} if(action=== '2'){reverse(0,1)} if(action=== '3'){reverse(0,2)}
        if(action=== '4'){reverse(0,3)} if(action=== '5'){reverse(0,4)} if(action=== '6'){reverse(0,5)}

        if(action=== '7'){reverse(1,0)} if(action=== '8'){reverse(1,1)} if(action=== '9'){reverse(1,2)}
        if(action==='10'){reverse(1,3)} if(action==='11'){reverse(1,4)} if(action==='12'){reverse(1,5)}

        if(action==='13'){reverse(2,0)} if(action==='14'){reverse(2,1)} if(action==='15'){reverse(2,2)}
        if(action==='16'){reverse(2,3)} if(action==='17'){reverse(2,4)} if(action==='18'){reverse(2,5)}

        if(action==='19'){reverse(3,0)} if(action==='20'){reverse(3,1)} if(action==='21'){reverse(3,2)}
        if(action==='22'){reverse(3,3)} if(action==='23'){reverse(3,4)} if(action==='24'){reverse(3,5)}

        if(action==='25'){reverse(4,0)} if(action==='26'){reverse(4,1)} if(action==='27'){reverse(4,2)}
        if(action==='28'){reverse(4,3)} if(action==='29'){reverse(4,4)} if(action==='30'){reverse(4,5)}

        if(action==='31'){reverse(5,0)} if(action==='32'){reverse(5,1)} if(action==='33'){reverse(5,2)}
        if(action==='34'){reverse(5,3)} if(action==='35'){reverse(5,4)} if(action==='36'){reverse(5,5)}

        const opts = {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: map[0][0],callback_data: '1'},
                        {text: map[0][1],callback_data: '2'},
                        {text: map[0][2],callback_data: '3'},
                        {text: map[0][3],callback_data: '4'},
                        {text: map[0][4],callback_data: '5'},
                        {text: map[0][5],callback_data: '6'}
                    ],
                    [
                        {text: map[1][0],callback_data: '7'},
                        {text: map[1][1],callback_data: '8'},
                        {text: map[1][2],callback_data: '9'},
                        {text: map[1][3],callback_data: '10'},
                        {text: map[1][4],callback_data: '11'},
                        {text: map[1][5],callback_data: '12'}
                    ],
                    [
                        {text: map[2][0],callback_data: '13'},
                        {text: map[2][1],callback_data: '14'},
                        {text: map[2][2],callback_data: '15'},
                        {text: map[2][3],callback_data: '16'},
                        {text: map[2][4],callback_data: '17'},
                        {text: map[2][5],callback_data: '18'}
                    ],
                    [
                        {text: map[3][0],callback_data: '19'},
                        {text: map[3][1],callback_data: '20'},
                        {text: map[3][2],callback_data: '21'},
                        {text: map[3][3],callback_data: '22'},
                        {text: map[3][4],callback_data: '23'},
                        {text: map[3][5],callback_data: '24'}
                    ],
                    [
                        {text: map[4][0],callback_data: '25'},
                        {text: map[4][1],callback_data: '26'},
                        {text: map[4][2],callback_data: '27'},
                        {text: map[4][3],callback_data: '28'},
                        {text: map[4][4],callback_data: '29'},
                        {text: map[4][5],callback_data: '30'}
                    ],
                    [
                        {text: map[5][0],callback_data: '31'},
                        {text: map[5][1],callback_data: '32'},
                        {text: map[5][2],callback_data: '33'},
                        {text: map[5][3],callback_data: '34'},
                        {text: map[5][4],callback_data: '35'},
                        {text: map[5][5],callback_data: '36'}
                    ],
                    [
                        {text: 'Guardar',callback_data: '37'}
                    ]
                ]
            }
        };

        if(action==='37'){
            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var dbo = db.db(base);
              var myobj = { data: map };
              dbo.collection("paints").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 paint inserted");
                db.close();
              });
            });
            opts = {
            chat_id: msg.chat.id,
            message_id: msg.message_id};
        }
        text='va';
        bot.editMessageText(map[0].join("")+"\n"+map[1].join("")+"\n"+map[2].join("")+"\n"+
                            map[3].join("")+"\n"+map[4].join("")+"\n"+map[5].join("")+"\n", opts);
    }
});

//Funcion para tener la hora corta
function cogerHora() {
    var nd = new Date();
    var h = ""+nd.getHours();
    var m = ""+nd.getMinutes();
    var s = ""+nd.getSeconds();
    if(h.length<2){
        h = "0"+h;
    }
    if(m.length<2){
        m = "0"+m;
    }
    if(s.length<2){
        s = "0"+s;
    }
    var nh = h+":"+m+":"+s;
    barra = "<-._.-¨-<( "+nh+" )>-¨-._.->";
    return nh;
}

//Funcion para eliminar duplicados de la lista de jugadores
function removeDuplicates(num) {
    var x,
      len=num.length,
      out=[],
      obj={};
 
    for (x=0; x<len; x++) {
        obj[num[x]]=0;
    }
    for (x in obj) {
        out.push(x);
    }
    lastLog += "\n" + cogerHora() + " ✓ Duplicados eliminados";
    console.log("✓ Duplicados eliminados");
    console.log(barra);
    return out;
}
//Funcion para guardar las estadisticas
function saveStats(name,score) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(base);
        var myquery = { nombre: name };
        var up = { upsert : true };
        var newvalues = { $inc: { puntos: score } };
        dbo.collection("stats").updateOne(myquery, newvalues,up, function(err, res) {
            if (err) throw err;
            console.log("✓ Estadisticas de "+name+" actualizadas");
        });
        db.close();
    });
}
//Volteador de fichas
function reverse(r,c) {
    if(map[r][c]=="⬜"){
        map[r][c]="⬛";
    }
    else{
        map[r][c]="⬜";
    }
}

function scaleArray(src, factor) {
  
  var srcWidth = src[0].length,
      srcHeight = src.length,
      dstWidth = srcWidth  * factor,
      dstHeight = srcHeight * factor;

  var dst = [];
  for (var col = 0; col < srcHeight; col++) {
    for (var i = 0; i < factor; i++) {
      var current_col = [];
      for (var row  = 0; row < srcWidth; row++) {
        for (var j = 0; j < factor; j++) {
          current_col.push(src[col][row]);
        }
      }
      dst.push(current_col);
    }
  }
  return dst;
}
}
