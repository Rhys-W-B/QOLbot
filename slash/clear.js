const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")
const mysql = require("mysql2");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear_counter")
        .setDescription("remove a counter from the database")
        .addStringOption((option) =>
        option
            .setName("name")
            .setDescription("name of counter to remove or * to remove all")
            .setRequired(true)),

    run: async ({client, interaction}) => {
        var string = interaction.options.getString("name");

        const connection = mysql.createConnection({
            host: 'localhost',
            user: "qolbot",
            password: "qolbot",
            database: 'qolbot'
        });

        if (string == "*"){
            connection.execute("SET SQL_SAFE_UPDATES=0");
            connection.execute("DELETE FROM counters");
            interaction.editReply("All counters deleted.");
        }else{
            connection.execute(
                'DELETE FROM counters WHERE name = ?',
                [string]
            )
            interaction.editReply(string+" counter deleted.");
        }  
        connection.end();
    }
}