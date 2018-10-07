exports.logMessage = (type, message) => {
  let typeString;
  switch (type) {
    case 0:
      typeString = "INFO";
      break;
    case 1:
      typeString = "WARNING";
      break;
    case 2:
      typeString = "ERROR";
      break;
    default:
      typeString = "LOG";
  }
  let datestamp = "";
  datestamp += new Date();
  console.log(`[${typeString.toUpperCase()}] {${datestamp.toUpperCase()}} ${message.toUpperCase()}`);
}

exports.random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
