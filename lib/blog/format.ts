export function formatDateDot(isoDate: string) {
  const date = parsePostDate(isoDate);
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

/** `2026년 3월 9일` 형식 */
export function formatDateLong(isoDate: string) {
  const date = parsePostDate(isoDate);
  if (!date) return "";
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function parsePostDate(isoDate: string) {
  if (!isoDate) return null;
  // Velite `isodate`는 `2026-03-09T00:00:00.000Z`처럼 이미 시각이 붙을 수 있음
  const date = new Date(
    isoDate.includes("T") ? isoDate : `${isoDate}T12:00:00`,
  );
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

/** 본문 길이 기준 대략적인 읽기 시간(분) */
export function estimateReadingMinutes(body: string) {
  const chars = body.replace(/\s/g, "").length;
  return Math.max(1, Math.ceil(chars / 500));
}
