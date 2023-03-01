import { useRouter } from "next/router";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getEventById } from "../../dummy-data";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage() {
  const router = useRouter();
  const eventId = router.query.eventid;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <ErrorAlert>
        <h1>No Event found!</h1>
      </ErrorAlert>
    );
  }

  return (
    <div>
      <Fragment>
        <EventSummary title={event.title} />
        <EventLogistics
          date={event.date}
          image={event.image}
          address={event.location}
          imageAlt={event.title}
        />
        <EventContent>{event.description}</EventContent>
      </Fragment>
    </div>
  );
}

export default EventDetailPage;
