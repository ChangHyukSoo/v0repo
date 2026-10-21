export function formatDate(date: string) {
  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' }).format(new Date(`${date}T00:00:00`))
}
