const mongoose = require('mongoose');

module.exports = async winston => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    winston.info(`Application connected to ${connection.connection.name} on ${connection.connection.host} and port ${connection.connection.port}`);
  } catch (error) {
    console.log(error);
    winston.error(error);
    process.exit(1);
  }
};
