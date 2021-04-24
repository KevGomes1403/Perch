module.exports = {
  name: 'chirp',
  description: 'checks if Perch is alive',
  execute(message, args) {
    message.channel.send('quack');
  }
}
