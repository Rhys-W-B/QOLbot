const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")
const mysql = require("mysql2");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("display")
        .setDescription("show counter data")
        .addStringOption((option) =>
        option
            .setName("name")
            .setDescription("input form: [name]")
            .setRequired(true)),

    run: async ({client, interaction}) => {
        const string = interaction.options.getString("name");
        const connection = mysql.createConnection({
            host: 'localhost',
            user: "qolbot",
            password: "qolbot",
            database: 'qolbot',
            rowsAsArray: true
        });

        connection.execute(
            'select user, data from counter_data where name = ?',
            [string],
            function(err, results, fields) {
                console.log(results);
                var output = string+" counter:\n";
                for (const row of results){
                    output += row[0]+": "+row[1]+"\n";
                }
                interaction.editReply(output);
            }
          );
        connection.end(); 
    }
}