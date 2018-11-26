# Clown Bot

> This is a simple bot for Discord which is capable of retrieving the latest XKCD comic, or a random one, and it
> also tells some interesting jokes if you ask him.

## Install

You'll need two things to install/run this bot for yourself:

- A Discord application bot token: get one [here](https://discordapp.com/developers/applications/).
- An account on [Dialogflow](https://console.dialogflow.com/api-client) so you can use the natural language processing.

On the Dialogflow account, you can import these [intents](./intents). After having those, you'll need to set thre
environment variables:

- `DISCORD_BOT` - the Discord bot token.
- `PROJECT_ID` - the project ID (can be found on Dialogflow settings).
- `GOOGLE_APPLICATION_CREDENTIALS` - the path to your [GApp credentials](https://cloud.google.com/docs/authentication/getting-started).

Then, just run:

```
npm install
npm start
```

## Usage

On your server, try running `@YourBot what do you do?` or `!help`.

## Contributing

PRs accepted.

## License

MIT © Henrique Dias
