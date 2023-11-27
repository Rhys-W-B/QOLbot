const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")
const mysql = require("mysql2");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quote")
        .setDescription("save a quote and it's author")
        .addStringOption((option) =>
        option
            .setName("message")
            .setDescription("message to save")
            .setRequired(true))
        .addStringOption((option) =>
        option
            .setName("name")
            .setDescription("name of quoted person")
            .setRequired(true)),

    run: async ({client, interaction}) => {
        const message = interaction.options.getString("message");
        const name = interaction.options.getString("name");

        const connection = mysql.createConnection({
            host: 'localhost',
            user: "qolbot",
            password: "qolbot",
            database: 'qolbot'
        });

        connection.execute(
            'insert into quotes values(null, ?, ?)',
            [message, name],
            function(err, results, fields) {
                if (err == null){
                    interaction.editReply("Quote added!");  
                }else if (err.errno == 1062){
                    interaction.editReply("Error: quote already exists.");  
                }
            })
            
        connection.end();
    }
}