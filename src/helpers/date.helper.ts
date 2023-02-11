export function addTimeInMinutesToCurrentTime(minutes: number) {
  const d1 = new Date()
  const d2 = new Date()
  d2.setMinutes(d1.getMinutes() + minutes)
  return { created_at: d1, expires_at: d2 }
}
