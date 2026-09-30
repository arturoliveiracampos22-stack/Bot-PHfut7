# 🤖 Artur AI — Discord Bot

Bot do Discord que responde usando IA quando alguém escreve **Artur**.

### Exemplos

`Artur qual é a capital do Brasil?`

`Artur me explica o que é buraco negro`

Se alguém mandar apenas `Artur`, o bot também responde e pede uma pergunta.

## 1. Instalar

```bash
npm install
```

## 2. Configurar

Copie `.env.example` para `.env` e preencha:

- `DISCORD_TOKEN` = token do bot
- `OPENAI_API_KEY` = chave da OpenAI API

Nunca coloque essas chaves no GitHub.

## 3. Permissão importante no Discord

No Discord Developer Portal, abra seu bot e ative:

**Privileged Gateway Intents → Message Content Intent**

Depois convide o bot para o servidor com as permissões necessárias para ler e responder mensagens.

## 4. Rodar

```bash
npm start
```

## Railway

No Railway, coloque as mesmas variáveis do `.env` em **Variables**:

- `DISCORD_TOKEN`
- `OPENAI_API_KEY`
- `TRIGGER_NAME`
- `OPENAI_MODEL`

O projeto já possui o script `npm start`.

## Observação

A API da OpenAI é paga conforme o uso. O bot não inclui nenhuma chave de API.
