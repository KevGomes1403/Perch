const twitter = require('./twitterApi.js')

module.exports = {
  name: 'acc',
  description: 'brief info about a particular account',
  execute(message, args) {
    const asyncApiCall = async (person) => {
      try {
        const user = await twitter.getUser(person);
        const userEmbed = twitter.account(user);

        message.channel.send(userEmbed);
        console.log(user.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    asyncApiCall(args[0]);
  }
}
