const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = `mongodb://localhost:27017`;
var connect;

module.exports = async () => {
    try {
        connect = await MongoClient.connect(url,
            { useNewUrlParser: true, native_parser: true, autoReconnect: true, poolSize: 10 });
        const db = connect.db('myphotos');
        console.log('Mongodb default connection open ');

        return {
            db,
            models: {
                photos: db.collection('photos'),
            }
        };
    } catch (err) {
        console.log(`Mongodb default connection error: ${err}`);
        throw err;
    } finally {
        process.on('SIGINT', function () {
            console.log('Mongodb default connection disconnected through app termination');
            connect.close();
            process.exit(0);
        });
    }
};
