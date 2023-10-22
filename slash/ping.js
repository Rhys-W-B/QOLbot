const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("does ping pong"),
    run: async ({client, interaction}) => {
        await interaction.editReply("Pong!");
    }
}