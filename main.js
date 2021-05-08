const TelegraamBotApi = require("node-telegram-bot-api")
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
 
fetch.Promise = Bluebird;
require("dotenv").config()

let token = process.env.token
const TOKEN = token

  let bot = new TelegraamBotApi(TOKEN, {
    polling:true
})

let value1 = 'uzbekistan'
let value2 = 'toshkent'


async function fetchch () {


}

let namoz = {
  resize_keyboard:true,
  keyboard:[
    [
      {text:"proyer times"},
    ]
  ]
}

bot.on("message", async(message) => {
    let message_id = message.message_id
    let chatId = message.chat.id
    let name = message.from.first_name
    let text = message.text
    let murkup = {
      resize_keyboard:true,
      keyboard:[
        [
          {text:"proyer times",callback_data:"proyer"},
          {text:"about creator",callback_data:"creator"}
        ]
      ]
    }
    if(text == "/start") {
      bot.sendMessage(chatId,"Assalomu alaykum", {
        reply_markup:murkup
      })
    }
})




let murkup1 = {
  inline_keyboard:[
    [
      {
        text:"Tashkent",
        callback_data:"tashkent"
      },
      {
        text:"Bukhara",
        callback_data:"bukhara"
      },
    ],
    [
      {
        text:"Samarkand",
        callback_data:"samarkand"
      },
    ],
    [
      {
        text:"Andijan",
        callback_data:"andijan"
      },
      {
        text:"Fergana",
        callback_data:"fergana"
      },
    ],
    [
      {
        text:"Jizzakh",
        callback_data:"jizzakh"
      },
      {
        text:"Urgench",
        callback_data:"urgench"
      },
    ],
    [
      {
        text:"Namangan",
        callback_data:"namangan"
      },
      {
        text:"Navoiy",
        callback_data:"navoiy"
      },
    ],
    [
      {
        text:"Qarshi",
        callback_data:"qarshi"
      },
      {
        text:"Termez",
        callback_data:"termez"
      },
    ],
    [
      {
        text:"Nukus",
        callback_data:"nukus"
      },
      {
        text:"Guliston",
        callback_data:"guliston"
      }
    ],
    [
      {text:"boshqa",callback_data:"boshqa"},
    ]
  ]
  
}
bot.on("message", async(message) => {
    let chatId = message.from.id
    let data = message.data
    let text = message.text
    let murkup = {
      resize_keyboard:true,
      one_time_keyboard:true,
      inline_keyboard:[
        [
          {text:"proyer times",callback_data:"solat"}
        ]
      ]
    }
    if(text == "about creator") {
      bot.sendMessage( chatId,`
      <a href="https://www.instagram.com/muhammad___zubayr_/">instagram profile</a>


<a href="https://muhammad-resume.netlify.app/">resume</a>


<a href="https://t.me/Quddusiyy">telegram profile</a>

      `,{
        parse_mode :'HTML' ,
      })
      
    }
    else if(text == "proyer times") {
      bot.sendMessage( chatId,'shaharni tanlang',{
        reply_markup:murkup1,
      })
    }
})


bot.on("callback_query",async message => {
  let chatId = message.from.id
  let data = message.data
  let message_id = message.message.message_id

  if(data == "tashkent" ||data == "bukhara" ||data == "samarkand" ||data == "andijan" ||data =="fergana" || data =="jizzakh" ||data == "urgench" ||data == "namangan" ||data == "navoiy" ||data == "qarshi" ||data == "termez" ||data == "nukus" ||data == "guliston") {
    let response = await fetch(`https://aladhan.p.rapidapi.com/timingsByCity?city=Uzbekistan&country=${data}`, {
      method: 'get',
    headers: {
    "x-rapidapi-key": "8326972a81msh26c1152b0ca15f9p18b0c1jsn92dab7390353",
    "x-rapidapi-host": "aladhan.p.rapidapi.com"
    }})
    response = await response.json()
    let time = response.data.timings
   
    bot.editMessageText(`<b>${response.data.date.hijri.day}</b> - <b>${response.data.date.hijri.month.en}</b>  <b>${response.data.date.hijri.year}</b> 
<b>${response.data.date.readable}</b>


<b>Fajr:</b> ${time.Fajr}
<b>Sunrice:</b> ${time.Sunrise}
<b>Zuhr:</b> ${time.Dhuhr}
<b>Asr:</b> ${time.Asr}
<b>Mag'rib:</b> ${time.Maghrib}
<b>Isha:</b> ${time.Isha}


<b>manzil:</b>${data}`,  {
      parse_mode :'HTML',
      chat_id:chatId,
      message_id:message_id ,
    })

    
    
  }
  else if(data == "boshqa") {

    const keyboard = {
      resize_keyboard:true,
      one_time_keyboard:true,
      keyboard: [
        [
          {text: "lokatsiya jo'natish", request_location:true}
        ]
      ]
    }
    bot.sendMessage(chatId, "lokatsiya jo'natish", {
      reply_markup:keyboard
    })
  }
})


bot.on("message",async message => {
   let message_id = message.message_id
    let chatId = message.chat.id
    let name = message.from.first_name
    let text = message.text
  if(message.location){
    let response = await fetch(`https://aladhan.p.rapidapi.com/timingsByCity?city=${message.location.latitude}&country=${message.location.longitude}`, {
      method: 'get',
    headers: {
    "x-rapidapi-key": "8326972a81msh26c1152b0ca15f9p18b0c1jsn92dab7390353",
    "x-rapidapi-host": "aladhan.p.rapidapi.com"
    }})
    response = await response.json()
    let time = response.data.timings
    bot.sendMessage(chatId,`<b>${response.data.date.hijri.day}</b> - <b>${response.data.date.hijri.month.en}</b>  <b>${response.data.date.hijri.year}</b> 
<b>${response.data.date.readable}</b>
    
    
<b>Fajr:</b> ${time.Fajr}
<b>Sunrice:</b> ${time.Sunrise}
<b>Zuhr:</b> ${time.Dhuhr}
<b>Asr:</b> ${time.Asr}
<b>Mag'rib:</b> ${time.Maghrib}
<b>Isha:</b> ${time.Isha}`,  {
          parse_mode :'HTML',
          reply_markup:namoz
        })
  }
  // \else if(text == "proyer times") {
    // bot.
  // }
})



bot.on("callback_query", async message => {
  let chatId = message.from.id
  let data = message.data
  let message_id = message.message.message_id
  if(data == "solat" ) {
    bot.editMessageText( 'shaharni tanlang',{
      reply_markup:murkup1,
      chat_id:chatId,
      message_id:message_id
    })
  }
})