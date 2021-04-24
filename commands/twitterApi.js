const Discord = require('discord.js');
const axios = require('axios').default;
const _ = require('lodash')

const { bearer } = require('./apiconfig.json');

const getUser = (userName) => {
  try {
    return axios.get("https://api.twitter.com/2/users/by/username/" + userName, {
      headers: {
        "Authorization": bearer
      },
      params: {
        "user.fields": "description,public_metrics,profile_image_url"
      }
    })
  } catch (error) {
    console.log(error);
  }
}

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
    console.log(error);
  }
}

const tweet = (timeline, index) => {
  const tweetData = `data.data[${index}]`;
  const userData = 'data.includes.users[0]';

  const tweetEmbed = new Discord.MessageEmbed()
    .setTitle(_.get(timeline, userData + '.name'))
    .setAuthor('@' + _.get(timeline, userData + '.username'), _.get(timeline, userData + '.profile_image_url'))
    .setDescription(_.get(timeline, tweetData + '.text'))
    .setColor('#00acee')
    .addFields(
      { name: '\:thumbsup:', value: _.get(timeline, tweetData + '.public_metrics.like_count'), inline: true },
      { name: '\:recycle:', value: _.get(timeline, tweetData + '.public_metrics.retweet_count'), inline: true },
    );

    return tweetEmbed;
}

const account = (user) => {
  const userData = 'data.data';
  const metrics = 'data.data.public_metrics';

  const username = _.get(user, userData + '.username');
  const name = _.get(user, userData + '.name');
  const description = _.get(user, userData + '.description');
  const pic = _.get(user, userData + '.profile_image_url');

  const followers = _.get(user, metrics + '.followers_count');
  const following = _.get(user, metrics + '.following_count');
  const tweetCount = _.get(user, metrics + '.tweet_count');

  const accEmbed = new Discord.MessageEmbed()
    .setTitle(name)
    .setAuthor('@' + username)
    .setDescription(description)
    .setThumbnail(pic)
    .setColor('#00acee')
    .addFields(
      { name: 'Followers:', value: followers, inline: true },
      { name: 'Following:', value: following, inline: true },
      { name: 'Tweets:', value: tweetCount, inline: true }
    );

    return accEmbed;
}

module.exports = {
  getTimeline,
  getUser,
  tweet,
  account
}
