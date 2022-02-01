const Discord = require('discord.js');
const { token } = require('./config.json');

const client = new Discord.Client();


client.once('ready', () => {
	console.log('Ready!');
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('voiceStateUpdate', async (oldState, newState) => {
    if(newState.member.id === client.user.id) return;
    const channel = client.channels.cache.get('867457879047929918');
    if(newState.channelID === null){
        console.log(`${newState.member.displayName} left channel ${oldState.channel.name}`);
        channel.send(`${newState.member.displayName} saiu do canal ${oldState.channel.name}`);
    }
    else{
        console.log(`${newState.member.displayName} joined channel ${newState.channel.name}`);
        channel.send(`${newState.member.displayName} entrou no canal ${newState.channel.name}`);
        const voiceChannel = newState.member.voice.channel;
        const connection = await voiceChannel.join();
        const ytdl = require('ytdl-core')
        const dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=W8ab00LC-JQ'))
        dispatcher.on('finish', () => voiceChannel.leave())
        
    }
});

client.login(token);
