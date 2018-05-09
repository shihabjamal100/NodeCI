const mongoose = require("mongoose");
const USer = mongoose.model("User");

module.exports = () => {
  return new USer({}).save();
};
