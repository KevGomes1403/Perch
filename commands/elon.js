const twitter = require('./twitterApi.js')

module.exports = {
  name: 'elon',
  description: 'provides a random elon musk tweet',
  execute(message, args) {
    const asyncApiCall = async () => {
      try {
        const timeline = await twitter.getTimeline("44196397")
        const random = Math.floor(Math.random() * 20);
        const tweetEmbed = twitter.tweet(timeline, random);

        message.channel.send(tweetEmbed);
      } catch (error) {
      console.log(error)
      }
    }
    asyncApiCall();
  }
};
