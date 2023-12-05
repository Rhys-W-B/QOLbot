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
            .setRequired(true))
        .addStringOption((option) =>
        option
            .setName("number")
            .setDescription("amount to add")
            .setRequired(true)),
        

    run: async ({client, interaction}) => {
        const counter = interaction.options.getString("counter");
        const user = interaction.options.getString("user");
        const num = interaction.options.getString("number");
        const connection = mysql.createConnection({
            host: 'localhost',
            user: "qolbot",
            password: "qolbot",
            database: 'qolbot',
            rowsAsArray: true
        });
        try{
            connection.execute(
                'select data from counter_data where counter = ? and user = ?',
                [counter, user],
                function(err, results, fields) {
                    if(results == undefined){
                        connection.execute(
                            'insert into counter_data values(?,?,?)',
                            [counter, user, num]
                        );
                    }else{
                        connection.execute(
                            'update counter_data set data = data + ? where name = ? and user = ?',
                            [num, counter, user]
                        );  
                    }

                    connection.execute(
                        'select data from counter_data where name = ? and user = ?',
                        [counter, user],
                        function(err, results, fields) {
                            interaction.editReply("Added "+counter+" to "+user+", their total is now "+results[0][0]);
                        }
                    );
                }
            );  
        }catch(error){
            interaction.editReply("Invalid request.")
        }
        
        connection.end(); 
    }
}