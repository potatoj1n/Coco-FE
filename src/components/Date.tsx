// src/utils/dateUtils.ts

export function getCurrentDate() {
  const date = new Date();
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    // JavaScript에서 월은 0부터 시작하므로 1을 더해줍니다.
  };
}
