// import { useRouter } from "next/router";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import {
  getEventById,
  getFeaturedEvents,
} from "../../components/helper/api-utils";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage(props) {
  // const router = useRouter();
  // const eventId = router.query.eventid;
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <h1>Loading...</h1>
      </div>
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

export async function getStaticProps(context) {
  const eventId = context.params.eventid;

  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => {
    return { params: { eventid: event.id } };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

export default EventDetailPage;