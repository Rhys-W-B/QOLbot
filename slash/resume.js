const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes the music"),
    run: async({clien, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue)
        {
            return await interaction.editReply("There are no songs in the queue")
        }
        queue.setPaused(false)
        await interaction.editReply("Music has been resumed! use `/pause` to pause the music")
    },
}