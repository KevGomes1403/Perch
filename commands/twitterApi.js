const Discord = require('discord.js');
const axios = require('axios').default;
const _ = require('lodash')

const { bearer } = require('./apiconfig.json');

const getTimeline = (id) => {
  try {
    return axios.get("https://api.twitter.com/2/users/" + id + "/tweets", {
      headers: {
        "Authorization": bearer
      },
      params: {
        "exclude": "replies",
        "max_results": 10,
        "expansions": "author_id",
        "tweet.fields": "public_metrics",
        "user.fields": "name,username,profile_image_url"
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const tweet = (timeline, index) => {
  const tweetData = `data.data[${index}]`;
  const userData = 'data.includes.users[0]';

  const tweetEmbed = new Discord.MessageEmbed()
    .setTitle(_.get(timeline, userData + '.name'))
    .setAuthor(_.get(timeline, userData + '.username'), _.get(timeline, userData + '.profile_image_url'))
    .setDescription(_.get(timeline, tweetData + '.text'))
    .addFields(
      { name: '\:thumbsup:', value: _.get(timeline, tweetData + '.public_metrics.like_count'), inline: true },
      { name: '\:recycle:', value: _.get(timeline, tweetData + '.public_metrics.retweet_count'), inline: true },
    );

    return tweetEmbed;
}

module.exports = {
  getTimeline,
  tweet
}
