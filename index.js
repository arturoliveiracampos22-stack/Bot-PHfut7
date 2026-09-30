require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const OpenAI = require("openai");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const TRIGGER = (process.env.TRIGGER_NAME || "Artur").toLowerCase();
const MODEL = process.env.OPENAI_MODEL || "gpt-5.6-luna";

client.once("ready", () => {
  console.log(`✅ ${client.user.tag} está online!`);
  console.log(`🤖 Respondo quando alguém falar "${TRIGGER}".`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;

  const content = message.content.trim();
  const lower = content.toLowerCase();

  if (!lower.includes(TRIGGER)) return;

  // Remove apenas a palavra-chave "Artur" e usa o restante como pergunta.
  const prompt = content.replace(new RegExp(TRIGGER, "ig"), "").trim();

  if (!prompt) {
    return message.reply("Fala comigo 😎 O que você quer saber?");
  }

  try {
    await message.channel.sendTyping();

    const response = await openai.responses.create({
      model: MODEL,
      instructions:
        "Você é o Artur, um assistente de Discord. Responda em português do Brasil, de forma natural, curta e amigável. Não diga que é uma IA a menos que perguntem. Não use @everyone ou @here.",
      input: prompt,
      max_output_tokens: 500
    });

    const answer = response.output_text?.trim();

    if (!answer) {
      return message.reply("Não consegui pensar em uma resposta agora 😅");
    }

    await message.reply(answer.slice(0, 1900));
  } catch (error) {
    console.error("Erro na IA:", error);
    await message.reply("Deu um erro ao falar com a IA. Verifique a chave da OpenAI e tente novamente.");
  }
});

client.login(process.env.DISCORD_TOKEN);
