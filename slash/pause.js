const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the music"),
    run: async({clien, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue)
        {
            return await interaction.editReply("There are no songs in the queue")
        }
        queue.setPaused(true)
        await interaction.editReply("Music has been paused! use `/resume` to resume the music")
    },
}