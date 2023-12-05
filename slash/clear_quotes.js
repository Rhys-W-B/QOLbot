const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")
const mysql = require("mysql2");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear_quotes")
        .setDescription("remove all quotes from the database"),

    run: async ({client, interaction}) => {
        var string = interaction.options.getString("name");

        const connection = mysql.createConnection({
            host: 'localhost',
            user: "qolbot",
            password: "qolbot",
            database: 'qolbot'
        });
        connection.execute("SET SQL_SAFE_UPDATES=0");
        connection.execute("DELETE FROM quotes");
        interaction.editReply("All quotes deleted.");
        connection.end();
    }
}