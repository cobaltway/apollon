const Twitter = require('twitter');

const client = new Twitter(global.config.actions.saveTwitter.credentials);

module.exports = function(message) {
    if (message.content.indexOf('may twitter god save') === 0 && message.content.substring(20).trim()) {
        const account = message.content.substring(20).trim(),
            queryString = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + account + '&count=200';
        client.get(queryString, (err, tweets) => {
            if (err) {
                this.talk(message.channel, 'Uh oh, something goes wrong with ' + account);
            }
            const twitterLinks = /(http|https):\/\/t.co\/\S+/g;
            // let result = '';
            tweets.map((t) => {
                // let created = new Date((t.created_at)).toUTCString();
                // result += created + ' | ' + t.text + '\n';
                let links = t.text.match(twitterLinks);
                if (links) {
                    links.map((l) => {
                        console.log(l);
                    });
                }
                if (t.extended_entities && t.extended_entities.media) {
                    t.extended_entities.media.map((media) => {
                        if (media.type === 'photo') {
                            console.log(media.media_url);
                        }
                    });
                }
            });
            // console.log(result);
        });
    }
    return false;
};
