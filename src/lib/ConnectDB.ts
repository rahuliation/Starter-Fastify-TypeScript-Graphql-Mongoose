import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { DB_URL } = process.env;
mongoose.plugin(mongoosePaginate);

export default function (onConnect: (dbURL: string) => {}) {
  mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.once('open', () => {
    onConnect(DB_URL);
  });
}
