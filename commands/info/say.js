const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: "say",
        aliases: ["echo", "repeat"],
        usage: `${prefix}say [embed] message`,
        category: "info",
        description: "Repeats what user inputs",

    },

    run: async (message, args, client) => {
        if (args.length < 1) {
            return (message.reply("Kinda hard to say something if you didn't tell me what to say."));
        }
        if (args[0] === "embed") {
            const embed = new MessageEmbed()
                .setColor(0x96fac5)
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL)
            message.channel.send(embed);
        } else {
            message.channel.send(args.slice(0).join(" "));
        }
    }
}
