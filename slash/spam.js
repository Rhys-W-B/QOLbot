const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("spam")
        .setDescription("spams x amount of times")
        .addStringOption((option) =>
            option
            .setName("number")
            .setDescription("how many spams to spam")
            .setRequired(true)),
    run: async ({client, interaction}) => {
        const string = interaction.options.getString("number")
        let string2 = string.trim();
        const myArr = string2.split("d");
        let x = parseInt(myArr[0])
        await interaction.editReply(""+x)
    }
}