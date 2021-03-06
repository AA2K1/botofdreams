const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch").default;
const colours = require("../colours.json");
module.exports = {
  name: "meme",
  cooldown: 5,
  category: "fun",
  aliases: ["maymay", "randommeme", "memes"],
  description: "Sends a random dank meme through an embed",
  run: async (message, args, client) => {
    if (args.length < 1) {
      const subReddits = [
        "blursedimages",
        "okbuddyretard",
        "okbuddybaka",
        "okbuddychicanery",
        "me_irl",
        "dankmemes"
      ];
      let randomsubreddit = subReddits[Math.floor(Math.random() * subReddits.length)];
      const results = await fetch(`https://www.reddit.com/r/${randomsubreddit}.json?sort=top&t=week`)
        .then(res => res.json());
      const allowed = message.channel.nsfw
        ? results.data.children
        : results.data.children.filter(post => !post.data.over_18);
      if (!allowed.length)
        return message.channel.send(
          "`ERROR: It seems we are out of fresh memes! Try again later.`"
        );
      const randomnumber = Math.floor(Math.random() * allowed.length);
      const embed = new MessageEmbed()
        .setColor(colours.fun)
        .setAuthor(`From /r/${randomsubreddit}`)
        .setTitle(`\`Title of fresh meme: ${allowed[randomnumber].data.title}\``)
        .setDescription(
          `Posted by fellow memer: \`${allowed[randomnumber].data.author}\``
        )
        .setImage(allowed[randomnumber].data.url)
        .addField(
          "Other info:",
          `**Updoots: ** \`${allowed[randomnumber].data.ups}\``,
          true
        )
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL());
      message.channel.send(embed);
    } else {
      message.reply(
        "ERROR: Cannot input subreddit name. For that, use ~reddit."
      );
    }
  }
};
