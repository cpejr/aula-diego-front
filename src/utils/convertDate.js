function UTCToLocal(date) {
  const convertedDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000
  );
  return convertedDate;
}

module.exports = UTCToLocal;
