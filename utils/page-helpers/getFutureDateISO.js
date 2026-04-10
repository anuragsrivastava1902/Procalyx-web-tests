export default async function getFutureDateISO(daysToAdd = 7) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  const futureDate = date.toISOString().split('T')[0];
  console.log(futureDate);
  return futureDate;
}
getFutureDateISO();