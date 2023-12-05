const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")
const mysql = require("mysql2");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("random_quote")
        .setDescription("retrieve a random quote"),

    run: async ({client, interaction}) => {
        const message = interaction.options.getString("message");
        const name = interaction.options.getString("name");

        const connection = mysql.createConnection({
            host: 'localhost',
            user: "qolbot",
            password: "qolbot",
            database: 'qolbot',
            rowsAsArray: true
        });

        connection.execute(
            'select * from quotes',
            function(err, results, fields) {
                if(results.length == 0){
                    interaction.editReply("No quotes have been saved.");
                }else{
                    num = Math.floor(Math.random() * results.length);
                    console.log(num);
                    console.log(results);
                    output = "\"" + results[num][1] + "\"\n-" + results[num][2];
                    interaction.editReply(output);
                }
                
            })
            
        connection.end();
    }
}