export async function getAllEvent() {
  const response = await fetch(
    "https://react-dummydb-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvent();
  if (!allEvents) {
    return <p>Error!</p>;
  }
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvent();
  return allEvents.find((event) => event.id === id);
}
