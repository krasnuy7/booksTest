const mongoose = require('mongoose')

const CollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
})

mongoose.model('Collection', CollectionSchema)
