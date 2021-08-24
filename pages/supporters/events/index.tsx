import { fetchAPI, getChildNavItems, responsiveImageFragment } from 'lib/api';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { renderMetaTags } from 'react-datocms';
import Container from '../../../components/container';
import Button from '../../../components/button';
import Article from '../../../components/article';
import EventCardList from '../../../components/event-card-list';
import Hero from '../../../components/hero';
import Layout from '../../../components/layout';
import TextWithImage from '../../../components/text-with-image';
import Decoration from '../../../components/decoration';

/* eslint-disable react/no-danger */
export default function EventsHome({
  preview,
  secondaryNavItems,
  eventsPage,
  upcomingEvents = [],
  favicon,
}) {
  return (
    <>
      <Head>
        <title>Events & Challenges</title>
        {renderMetaTags(favicon)}
      </Head>
      <Layout
        brand="supporters"
        preview={preview}
        pageTitle="Events & Challenges"
        secondaryNavItems={secondaryNavItems}
      >
        <Hero
          title="Join Team Whizz‑Kidz"
          pattern="supporters"
          backgroundType="color"
        />
        <Decoration decorationPosition="right" decorationType="asterisk02" />
				{eventsPage.featuredEvent && (
					<TextWithImage
						image={eventsPage.featuredEvent.image}
						imagePosition="right"
						eyebrow="Featured Event"
						heading={eventsPage.featuredEvent.name}
						callToAction={{
							label: 'See Event Details',
							internal: {
								_modelApiKey: 'event',
								slug: eventsPage.featuredEvent.slug,
							},
						}}
					/>
				)}
        <EventCardList events={upcomingEvents} label="Upcoming Events" />
        <Container className="text-center mb-10">
          <Button
            size="lg"
            linkProps={{
              href: `/supporters/events/all`,
            }}
          >
            View All Events
          </Button>
        </Container>
        <Decoration decorationPosition="left" decorationType="asterisk03" />
        <Article body={eventsPage.openingParagraph} centered />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const preview = !!context.preview;
  const secondaryNavItems = await getChildNavItems('supporters');

  const { eventsPage, upcomingEvents, site } = await fetchAPI(
    `
query EventHomePage($now: DateTime) {
  site: _site {
    favicon: faviconMetaTags {
      attributes
      content
      tag
    }
  }
  eventsPage {
    openingParagraph(markdown: true)
    featuredEvent {
      slug
      name
      image {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 300, h: 300}) {
          ...responsiveImageFragment
        }
      }
    }
  }
  upcomingEvents: allEvents(orderBy: startDate_ASC, filter: {startDate: {gt: $now}}, first: "6") {
    slug
    name
    startDate
    image {
      responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 400, ar: "16:9"}) {
        ...responsiveImageFragment
      }
    }
  }
}
${responsiveImageFragment}
`,
    {
      variables: {
        now: new Date().toISOString(),
      },
      preview,
    }
  );

  return {
    props: {
      preview,
      secondaryNavItems,
      eventsPage,
      upcomingEvents,
      favicon: site.favicon,
    },
    revalidate: 60 * 30, // once every 30 mins
  };
};
