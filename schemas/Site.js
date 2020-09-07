var Site = mongoose.Schema({
  original_url: { type: String, required: true },
  short_url: { type: Number, required: true }
});

module.exports = mongoose.model('Site', Site);