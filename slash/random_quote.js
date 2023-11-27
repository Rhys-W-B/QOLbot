const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")
const mysql = require("mysql2");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quote")
        .setDescription("get a random saved quote"),

    run: async ({client, interaction}) => {
        const message = interaction.options.getString("message");
        const name = interaction.options.getString("name");

        const connection = mysql.createConnection({
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: 'qolbot',
            rowsAsArray: true
        });

        connection.execute(
            'select text, user from counter_data',
            function(err, results, fields) {
                var output = string+"\"";
                for (const row of results){
                    output += row[0]+": "+row[1]+"\n";
                }
                interaction.editReply(output);
            });  
        connection.end();
    }
}