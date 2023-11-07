const { groupBy, mergeMap, reduce, map } = require("rxjs");

module.exports = function getGroupStatistics(students$) {
  return students$.pipe(
    groupBy(p => p.group),
    mergeMap(group$ => group$.pipe(
      reduce((acc, cur) => {
        const ratingSum = acc.ratingSum + cur.rating;
        const groupMembers = ++acc.members;
        return {...acc, ratingSum: ratingSum, members: groupMembers};
      },{ group: group$.key, ratingSum: 0, members: 0})
    )),
    map(groupObj => ({
      group: groupObj.group,
      avgRating: groupObj.ratingSum / groupObj.members
    }))
  );
};
