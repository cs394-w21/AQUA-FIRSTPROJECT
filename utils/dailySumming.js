const dailySumming = (log) => {
  const recentDates = Array(7)
    .fill()
    .map((_, index) => {
      let date = new Date();
      let temp = new Date(date.setDate(date.getDate() - 6 + index));
      return temp.toJSON();
    });
  console.log(recentDates);

  return recentDates;
};
export default dailySumming;
