import Head from "next/head";
import Link from "next/link";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../components/helper/api-utils";
import NewsletterRegistration from "../components/input/newsletter-registration";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve!"
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
