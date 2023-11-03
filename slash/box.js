const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("box")
        .setDescription("tests the input functionality of discord bot commands. Does this by making a box of A x B size")
        .addStringOption((option) =>
            option
            .setName("input")
            .setDescription("input form: AxB. ex: 3x3")
            .setRequired(true)),

    run: async ({client, interaction}) => {
        const string = interaction.options.getString("input")
        let string2 = string.trim();
        const myArr = string2.split("x");
        let length = parseInt(myArr[0])
        let width = parseInt(myArr[1])
        if(length >= Number.MAX_SAFE_INTEGER-1 || width >= Number.MAX_SAFE_INTEGER-1)
        {
            await interaction.editReply("Too big! imput a smaller number please");
        }
        if(!Number.isInteger(x) || !Number.isInteger(amount))
        {
            await interaction.editReply("Incorrect input, please try again")
        }
        else
        {
            for (let i = 0; i < width; i++)
            {
                for (let j = 0; i < length; i++) 
                {
                    await interaction.editReply("*");
                }
                await interaction.editReply("\n");
            }
        }
    }
}