const emoji = '!emoji '
const fetch = require('node-fetch');
const blackjack = require("discord-blackjack")


module.exports = {
    name : 'messageCreate',
    async execute(message) {
        let { guildIds } = require('../emojibot_files/guildIds.json')
        if(!guildIds.includes(message.guildId)) {
            guildIds.push(message.guildId)
            const fs = require('node:fs')
            const path = require('node:path')
            try {
                let guildIdsPath = path.join(__dirname, '..', 'emojibot_files', 'guildIds.json')
                fs.writeFileSync( guildIdsPath, JSON.stringify({ guildIds : guildIds }) )
                console.log('successfully added ' + message.guild.name + ' to the list of Servers')
            } catch(error) {
                console.error
            }
            const updateSlash = require('../emojibot_files/deploy-commands')
            updateSlash.execute(message.client.user.id)
        }

        if(message.author.id === message.client.user.id) return

        const content = message.content

        if(content.startsWith(emoji)) {
            /* Uncomment this is you want converted emoji messages tracked 
            const trackUserMessages = require('../emojibot_files/track.js')
            trackUserMessages.execute(message)
            */
            const contentMessage = content.substring(emoji.length)
            if(contentMessage.length >= 1)  {
                const convert = require('../emojibot_files/convert.js')
                message.channel.send(convert.execute(contentMessage))
            }
        } else if(content.includes('/grit')) {
            const { grit } = require('../emojibot_files/builtInMessages.json')
            message.channel.send(grit)
        } else if(content.toUpperCase().includes('SUCK')) {
            const { succ } = require('../emojibot_files/builtInMessages.json')
            message.channel.send(succ)
        } else if(content === '69' || content.startsWith('69 ') || content.endsWith(' 69') || content.includes(' 69 ')) {
            const convert = require('../emojibot_files/convert.js')
            message.channel.send(convert.execute('69? nice'))
        } else if(content === '420' || content.startsWith('420 ') || content.endsWith(' 420') || content.includes(' 420 ')) {
            const convert = require('../emojibot_files/convert.js')
            message.channel.send(convert.execute('420? nice'))
        } else if(content.includes('/oof') || content.includes('/bigoof')) {
            const { big_oof } = require('../emojibot_files/builtInMessages.json')
            message.channel.send(big_oof)
        } else if(content.includes('dog')) {
            fetch('https://dog.ceo/api/breeds/image/random').then(r => r.json()).then(dog => { 
                message.channel.send(dog.message)
            }).catch(e => {
                console.log(e);
            })
        } else if(content.includes('facts')) {
            fetch('https://uselessfacts.jsph.pl/random.json?language=en').then(r => r.json()).then(data => { 
            message.channel.send(data.text);
            }).catch(e => {
                console.log(e);
            })
        } else if(content.includes('meme')) {
            fetch(' https://api.imgflip.com/get_memes').then(r => r.json()).then(data => { 
                console.log(data);
                let n = Math.floor(Math.random() * 50);
            message.channel.send(data.data.memes[n].url);
            }).catch(e => {
                console.log(e);
            })
        } else if(content.includes('blackjackbaby')) {
            blackjack(message);
        }

        // if(content === '!!ping') await message.channel.send('Pong!')
    },
}