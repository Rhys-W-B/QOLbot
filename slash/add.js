const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")
const mysql = require("mysql2");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add")
        .setDescription("incriment a counter")
        .addStringOption((option) =>
        option
            .setName("counter")
            .setDescription("item to count, ex: apples")
            .setRequired(true))
        .addStringOption((option) =>
        option
            .setName("user")
            .setDescription("user to add to, ex: @user")
            .setRequired(true)),

    run: async ({client, interaction}) => {
        const counter = interaction.options.getString("counter");
        const user = interaction.options.getString("user");
        const connection = mysql.createConnection({
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: 'qolbot',
            rowsAsArray: true
        });

        connection.execute(
            'select data from counter_data where counter = ? and user = ?',
            [counter, user],
            function(err, results, fields) {
                if(results == undefined){
                    connection.execute(
                        'insert into counter_data values(?,?,1)',
                        [counter, user]
                    );
                }else{
                    connection.execute(
                        'update counter_data set data = data + 1 where name = ? and user = ?',
                        [counter, user]
                    );  
                }

                connection.execute(
                        'select data from counter_data where name = ? and user = ?',
                        [counter, user],
                        function(err, results, fields) {
                            interaction.editReply("Added "+counter+" to "+user+", their total is now "+results[0][0]);
                        }
                    );
              connection.end();  
            }
          );
        
    }
}