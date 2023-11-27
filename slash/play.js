const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder } = require("discord.js")
const { QueryType, useMainPlayer } = require("discord-player")
const { YouTubeExtractor } = require("@discord-player/extractor")
player = useMainPlayer()
player.extractors.register(YouTubeExtractor)

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("load songs from youtube")
        .addSubcommand((subcommand)=>
            subcommand.setName("song")
            .setDescription("loads a single song from youtube url")
            .addStringOption((option) => option.setName("url").setDescription("the song's url").setRequired(true))
        )
        .addSubcommand((subcommand)=>
            subcommand.setName("playlist")
            .setDescription("loads a playlist from youtube to play")
            .addStringOption((option) => option.setName("url").setDescription("the playlist's url").setRequired(true))
        ),
        run: async ({ client, interaction }) => {
            if(!interaction.member.voice.channel)
                return interaction.editReply("You need to be in a VC to use this command")

            const queue = await player.nodes.create(interaction.guild)
            if(!queue.connection) await queue.connect(interaction.member.voice.channel)

            let embed = new EmbedBuilder()

            if(interaction.options.getSubcommand() === "song"){
                let url = interaction.options.getString("url")
                console.log(url)
                const result = await player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })

                const song = result.tracks[0]
                await queue.addTrack(song)
                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({text: `Duration: ${song.duration}`})
            }
            else if(interaction.options.getSubcommand() === "playlist")
            {
                let url = interaction.options.getString("url")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_PLAYLIST
                })
                if(result.tracks.length === 0)
                {
                    return interaction.editReply("No results")
                }
                const playlist = result.playlist[0]
                await queue.addTracks(result.tracks)
                embed
                    .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** has been added to the Queue`)
                    .setThumbnail(playlist.thumbnail)
            }
            
            if(!queue.playing) await queue.node.play()
            console.log("playing")
            interaction.reply({
                embeds: [embed]
            })
        }

}