import { Client as BlackCatClient } from "blackcat-djs";
import Discord from "discord.js";
import mongoose from "mongoose";
import colors from "chalk";

import dataModel from "./Handlers/Schema/defaultData.js";

class Client extends BlackCatClient {
  constructor() {
    super({ 
      discordClient: {
        allowedMentions: {
          parse: ["roles", "users", "everyone"],
          repliedUser: false,
        },
        partials: [
          Discord.Partials.User,
          Discord.Partials.Message,
          Discord.Partials.Reaction
        ], //Object.keys(Discord.Partials), // get tất cả sự kiện mà partials
        intents: [
          Discord.GatewayIntentBits.Guilds,
          Discord.GatewayIntentBits.GuildMessages,
          Discord.GatewayIntentBits.MessageContent,
          Discord.GatewayIntentBits.GuildInvites,
          Discord.GatewayIntentBits.GuildMembers,
          Discord.GatewayIntentBits.GuildPresences,
          Discord.GatewayIntentBits.GuildMessageReactions,
          Discord.GatewayIntentBits.GuildVoiceStates
        ], // Object.keys(Discord.GatewayIntentBits), // lấy tất cả sự kiện mà Discord.GatewayIntentBits có
      },
      // config.json
      config: {
        tokenBot: process.env.token || "",
        prefix: process.env.prefix || "!!",
        developer: process.env.developer || "788208207465938954",
        mongourl: process.env.mongourl || "mongodb+srv://BlackCat-Club:blackcat2k3@blackcat-club.sfgyw.mongodb.net/BlackCat-Discord",
        clientId: "fc0d728b397c4f8398d2a13345c6d47c",
        youtubeCookie: "VISITOR_INFO1_LIVE=R_qi2x1CgIA; VISITOR_PRIVACY_METADATA=CgJWThIEGgAgXg%3D%3D; LOGIN_INFO=AFmmF2swRQIgKMXMHm1Jwli6pTRrEMnwq8ObmNm-r6vfzKqYynsDQVoCIQDJfG-s5Lf3QlVKRkGcwQmy5y2aqVrSGZFonI0o4lehvg:QUQ3MjNmeGVnYjNqM0h4TjdLZV80Vjk1QWJ5OFVXRnpkUlUzbWhnZUprWUVQQjVCMUp2U3ZFNjVjZlB1Nk1uSnhQSGRhdW5sN1ZWN1J0QnUtTlhFdFI1OWU2cjd3TVdnNV9FbWh2QThJR1l3R1dhNHBWaUVoX0RtLTFjSm9FeHpudF9aYjROc0R3TjdrSWUyU2pyMGFMX3ZmMUdob3l6TEVn; HSID=AobB_CkTf3NeC612N; SSID=A7BiEo7rkBRvRxfhT; APISID=6TVqRfoyB0nVCTI0/AKFQwKa7RSfIZHAL2; SAPISID=DHx3Up34BAjF0pkB/AlZ1g84uFXtLndEsw; __Secure-1PAPISID=DHx3Up34BAjF0pkB/AlZ1g84uFXtLndEsw; __Secure-3PAPISID=DHx3Up34BAjF0pkB/AlZ1g84uFXtLndEsw; SID=g.a000fQjvIjRpSb3lCo5TSm1XFIgJzucCwD-PLH4ARWcy0hQ1dlvRbvo7bNQnV0eXvQ9xr5d6KQACgYKAYUSAQASFQHGX2MiyKXLUCktgkS8TKulWSKP5xoVAUF8yKo2tCSNrTI5R4R0Haw5j4G60076; __Secure-1PSID=g.a000fQjvIjRpSb3lCo5TSm1XFIgJzucCwD-PLH4ARWcy0hQ1dlvRbKqZ0j65BH-ivfAUM9PzdAACgYKARkSAQASFQHGX2MimF0gz9N-j_RHFFfhnn9WDhoVAUF8yKqmQfUTZqKqFWRYMxIzeLXD0076; __Secure-3PSID=g.a000fQjvIjRpSb3lCo5TSm1XFIgJzucCwD-PLH4ARWcy0hQ1dlvRh0giuW8N8dCsi71lfrk8cgACgYKAfUSAQASFQHGX2Mit1AbAtg7HNCfgr7kSJjdYxoVAUF8yKqhR4q45IbP31wQvzHZjZ_O0076; YSC=SmHrgn6eL1g; PREF=f7=4100&f4=4000000&tz=Asia.Saigon; __Secure-1PSIDTS=sidts-CjEBPVxjSmie-o3nwQvk0mt5PLuKeikDlxwG3CPsC_HhBDkeT2LX8zgBGtQyu_AhGC4BEAA; __Secure-3PSIDTS=sidts-CjEBPVxjSmie-o3nwQvk0mt5PLuKeikDlxwG3CPsC_HhBDkeT2LX8zgBGtQyu_AhGC4BEAA; SIDCC=ABTWhQHms60NX3tbjXsyOK4NltjHUAEaR_kJYzXLeXtgNnHJrbgWucmZWoCCRzZ07FWuGHMPQFg; __Secure-1PSIDCC=ABTWhQHXeZHGmsfSSGsjhaVRyibjEUFddnAKhTTRq6n6CAAJtr8CbPSTO7g5nkCQAlBFd8fBng; __Secure-3PSIDCC=ABTWhQGjI5uxxvl5HNqIdzH9RvIPt3itEmgPyv_Ue8-tivW91E_Qb9QSttc-yJG54AX8_P8E6lo",
      },
      // bảng điêù khiển tùy chỉnh lệnh
      commandHandler: {
        prefixCommand: true, // bật hoặc tắt lệnh đang chạy với prefix
        slashCommand: true, // bật hoặc tắt lệnh slash
        setLanguage: "vi", // ngôn ngữ tùy chỉnh của gói. Hiện tại chỉ hỗ trợ 2 ngôn ngữ: vi: Tiếng Việt và en: Tiếng Anh
        path: {
          prefixCommand: "./Commands", // path to prefix commands
          slashCommand: "./slashCommands", // path to slash commands
        },
      },
    });
    this.maps = new Map();
    // xem bot đã onl hay chưa
    this.on(Discord.Events.ClientReady, async (bot) => {
      console.log(colors.yellow(bot.user.username + " đã sẵn sàng hoạt động"));
      mongoose.connect(this.config.mongourl).then(() => {
        console.log(colors.blue("Đã kết nối đến mongoose thành công."));
      }).catch(() => {
        console.log(colors.red("Kết nối đến mongoose không thành công."));
      });
      this.guilds.cache.forEach(async (guild) => {
        const checkGuild = await dataModel.findOne({ GuildId: guild.id });
        if(!checkGuild) return dataModel.create({
          GuildId: guild.id,
          GuildName: guild.name
        });
        if(checkGuild) return;
      });
    });
  };
  async handlerFolder(commands) {
    return Promise.all(commands.map((files) => import(`./Handlers/${files}.js`))).then((modules) => {
      modules.forEach((command) => command.default(this));
    }).catch((error) => console.error('Lỗi nhập mô-đun:', error));
  };
};

const build = new Client();

build.handlerFolder(["distube", "economy", "giveaways"]);