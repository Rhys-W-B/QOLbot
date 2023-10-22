const { Client, GatewayIntentBits,Collection } = require(`discord.js`);
const dotenv = require("dotenv")
const {REST} = require("@discordjs/rest")
const {Routes} = require("discord-api-types/v9")
const fs = require("fs")

dotenv.config()
const TOKEN = process.env.DISCORD_TOKEN

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
})

//music bot stuff
const LOAD_SLASH = process.argv[2] == "load"

const Client_ID = "1165749058363736084"
const GUILD_ID = "1165758133524770917" //ID for server it will be running in

client.slashcommands = new Collection()

let commands = []

const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
for(const file of slashFiles){
    const slashcmd = require(`./slash/${file}`) 
    // goes to directory and inserts file name, then puts 
    //"contents of file into slash command variable"
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (LOAD_SLASH) {commands.push(slashcmd.data.toJSON())}
}

if(LOAD_SLASH){
    const rest = new REST({version: "9"}).setToken(TOKEN)
    console.log("Deploying slash commands")
    rest.put(Routes.applicationGuildCommands(Client_ID,GUILD_ID),{body: commands})
    .then(()=>{
        console.log("successfully loaded")
        process.exit(0);
    })
    .catch((err)=>{
        if(err){
            console.log(err)
            process.exit(1)
        }
    })
}
else{
    client.on("ready",()=>{
        console.log(`Logged in as ${client.user.tag}`)
    })
    client.on("interactionCreate",(interaction) => {
        async function handleCommand(){
            if(!interaction.isCommand()) return

            const slashcmd = client.slashcommands.get(interaction.commandName)
            if(!slashcmd) {interaction.reply("Not a valid slash command")} 

            await interaction.deferReply()
            await slashcmd.run({client,interaction})
        }
        handleCommand()
    })
}

client.on(`ready`,() => {
    console.log(`bot ready!`)
})

client.on(`messageCreate`, message =>{
    
    //we can deal with messages here
    
})

client.login(TOKEN)