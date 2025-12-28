const client = require('./client');

async function pubsubDemo() {   
    const subscriber = client.duplicate();

    await subscriber.subscribe('news', (err, count) => {
        if (err) {
            console.error('Failed to subscribe: ', err);
        } else {
            console.log(`Subscribed successfully! This client is currently subscribed to ${count} channels.`);
        }
    });

    subscriber.on('message', (channel, message) => {
        console.log(`Received message from ${channel}: ${message}`);
    });

    // Simulate publishing messages
    setTimeout(async () => {
        await client.publish('news', 'Breaking News: Redis Pub/Sub is awesome!');
        await client.publish('news', 'Update: More news coming your way!');
        await client.publish('news', 'Final News: Stay tuned for more updates!');
    }, 1000);

}

pubsubDemo();


