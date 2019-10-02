import * as mongoose from 'mongoose';
const { DB_URL } = process.env;

export default function (onConnect: (dbURL: string) => {}) { 
 mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true });
 mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
 mongoose.connection.once('open', () =>  onConnect(DB_URL));
}