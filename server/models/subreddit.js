const mongoose = require('mongoose');

const subredditSchema = new mongoose.Schema(
  {
    subredditName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    subscribedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    subscriberCount: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);
const schemaCleaner = (schema) => {
  schema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.passwordHash;
    },
  });
};
schemaCleaner(subredditSchema);
// replaces _id with id, convert id to string from ObjectID and deletes __v
// value "{ subreddit: '61fe814eff1b4b0dec7351bc' }" (type Object) at path "_id" for model "Subreddit"
module.exports = mongoose.model('Subreddit', subredditSchema);
