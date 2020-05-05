const { MessageEmbed } = require("discord.js");
let coins = require("../coins.json");
const { promptMessage } = require('../functions.js');

const chooseArr = ['🔥', '💦', '🌱'];

module.exports = {
    name: "rps",
    aliases: ["rockpaperscissors"],
    category: "fun",
    description: "Plays a nice friendly game of rock paper scissors.",
    run: async (message, args, client) => {
        // if(args.length < 1) {
        //     return message.reply("Give your choice after ~rps.");
        // }
        // if(!chooseArr.includes(args[0])) {
        //     return message.reply("Your choices are: rock, paper, or scissors.");
        // }
        // const humanPick = args[0];
        // const botPick = chooseArr[Math.floor((Math.random() * chooseArr.length))];

        const embed = new MessageEmbed()
            .setColor(0x96fac5)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .setTitle(`${message.author.username} vs ${client.user.username}`)
            .setDescription(`React to this message in order to pick your choice.`)
        const m = await message.channel.send(embed)
        const reacted = await promptMessage(m, message.author, 30, chooseArr)
        await m.delete({}, 5000)
        //await m.clearReactions();

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)]
        let won = false;
        let moneyGained = Math.floor(Math.random() * 5) + 1;
        // const result = getWinner(reacted, botChoice);
        if(won) {
            coins[message.author.id].coins += moneyGained;
        }
        embed
            .setTitle(`**You: ${reacted} vs Me: ${botChoice}**`)
            .setDescription(getWinner(reacted, botChoice));
        m.edit(embed);


        function getWinner(botOption, humanOption) {
            if (botOption === humanOption) {
                return `Looks like it's a tie, ${message.author.username}. Well played.`
            } else if ((botOption === '🔥' && humanOption === '💦') || (botOption === '💦' && humanOption === '🌱') || (botOption === '🌱' && humanOption === '🔥')) {
                won = true;
                return `Looks like you won, ${message.author.username}. That was just luck. Got ${moneyGained} coins.`
            } else if ((botOption === '🔥' && humanOption === '🌱') || (botOption === '💦' && humanOption === '🔥') || (botOption === '🌱' && humanOption === '💦')) {
                return `Looks like I win, ${message.author.username}. Easy win, you suck.`
            }
        }
    }
}
