const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("gif_huntr")
    .setDescription("Retrieves and posts a random GIF (from a selection of 10) from a given search criteria")
    .addStringOption((option) =>
        option
        .setName("searchterm")
        .setDescription("The given search criteria for the desired GIF")
        .setRequired(true)
    ),

    run: async ({client, interaction}) => {
        // Search term preperation
        const search = interaction.options.getString("searchterm")
        let term = search.trim() // trims the ending whitespace of the search term
        const termArr = search.split(" ") // splits the search string into an array on spaces
        term = termArr.join("-") // reconnects the words of the search term with -'s

        // Defined API url with prepared term and API key 
        let url = `https://tenor.googleapis.com/v2/search?q=${term}&key=${process.env.TENOR_KEY}&client_key=my_test_app&limit=100&contentfilter=high`
        
        // Recieve API response
        let response = await fetch(url) 
        let json = await response.json()
        const index = Math.floor(Math.random() * json.results.length) // define a random index for which GIF to display, based on the length of results
        await interaction.editReply(json.results[index].url) // Respond with the url from the results array at index location
    }
}