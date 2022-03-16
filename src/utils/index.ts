/**
 *
 * @param data 数组
 * @param groupByNum 几个一组
 * @returns
 */
export const arrayByGroup = (data: any[], groupByNum: number) => {
  const n = groupByNum; //
  const result = Array.from(Array(Math.ceil(data.length / n))).map((_, i) =>
    data.slice(i * n, (i + 1) * n)
  );
  return result;
};
