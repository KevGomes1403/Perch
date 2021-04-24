const twitter = require('./twitterApi.js')

module.exports = {
  name: 'tmln',
  description: 'account stats and 3 recent tweets from a user',
  execute(message, args) {
    const asyncApiCall = async (person) => {
      try {
        const user = await twitter.getUser(person);
        const userID = user.data.data.id;
        const timeline = await twitter.getTimeline(userID);

        message.channel.send(twitter.account(user));

        for (let i = 0; i < 3; i++) {
          message.channel.send(twitter.tweet(timeline, i));
        }
      } catch (error) {
        console.error(error);
      }
    }

    asyncApiCall(args[0]);
  }
}
