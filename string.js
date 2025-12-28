const client = require('./client');

async function init() {
    await client.set('user:1', JSON.stringify({ name: 'John Doe', age: 30 }));
    const result = await client.get('user:1');
    console.log("Result -> ", result);
}


async function stringDemo() {
    await client.set('greeting', 'Hello, World!');
    await client.append('greeting', ' Have a great day!');
    const value = await client.get('greeting');
    console.log("Greeting:", value);
}

async function listDemo() {
    await client.del('greetings-list');
    await client.lpush('greetings-list', ' - From Redis');
    await client.lpush('greetings-list', ' - Enjoy coding!');
    await client.rpush('greetings-list', ' - Cheers!');
    const listValue = await client.lrange('greetings-list', 0, -1);
    console.log("List greetings:", listValue);
}

async function setDemo() {
    await client.sadd('unique-numbers', 1);
    await client.sadd('unique-numbers', 2);
    await client.sadd('unique-numbers', 2);
    await client.sadd('unique-numbers', 3);
    await client.sadd('another-set', 2);
    await client.sinterstore('intersection-set', 'unique-numbers', 'another-set');
    const intersectionValue = await client.smembers('intersection-set');
    console.log("Set intersection:", intersectionValue);
    const setValue = await client.smembers('unique-numbers');
    console.log("Set unique numbers:", setValue);
}

async function hashmapDemo() {
    await client.del('user:2', 'user:3', 'user:4');
    await client.hset(
        'user:2',
        { 
            name: 'Jane Smith', 
            age: '25', 
            city: 'New York' 
        });
    await client.hset(
        'user:3',
        { 
            name: 'Mike Johnson', 
            age: '35', 
            city: 'Chicago' 
        });
    await client.hset(
        'user:4',
        { 
            name: 'Emily Davis', 
            age: '28', 
            city: 'San Francisco' 
        });
        const fetchUser2 = await client.hget('user:2', 'age')
        console.log("User 2 age:", fetchUser2);
}

async function runDemos() {
    await init();
    await stringDemo();
    await listDemo();
    await setDemo();    
    await hashmapDemo();
}


runDemos();