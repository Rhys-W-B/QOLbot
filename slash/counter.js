const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")
const mysql = require("mysql2");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("counter")
        .setDescription("create a new per user counter")
        .addStringOption((option) =>
        option
            .setName("name")
            .setDescription("name of item to count")
            .setRequired(true)),

    run: async ({client, interaction}) => {
        const string = interaction.options.getString("name");
        const connection = mysql.createConnection({
            host: 'localhost',
            user: "qolbot",
            password: "qolbot",
            database: 'qolbot'
        });
        connection.execute(
            'insert into counters values(?)',
            [string],
            function(err, results, fields) {
                if (err == null){
                    interaction.editReply("Counter \""+string+"\" created!");  
                }else if (err.errno == 1062){
                    interaction.editReply("Error: Counter \""+string+"\" already exists.");  
                }
            })
            
        connection.end();
    }
}