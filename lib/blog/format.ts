export function formatDateDot(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

/** 본문 길이 기준 대략적인 읽기 시간(분) */
export function estimateReadingMinutes(body: string) {
  const chars = body.replace(/\s/g, "").length;
  return Math.max(1, Math.ceil(chars / 500));
}
