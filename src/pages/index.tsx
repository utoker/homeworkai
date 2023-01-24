import { Button, Col, Container, Row, Spacer, Text } from '@nextui-org/react';
import { type NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Footer from '../components/Footer';
import { useTheme } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import LoginModal from '../components/LoginModal';
import { useState } from 'react';
import { useRouter } from 'next/router';

// This is a workaround for hydration issues with Next.js
const Nav = dynamic(() => import('../components/Nav'), {
  ssr: false,
});

const Home: NextPage = () => {
  const route = useRouter();
  const { data: session } = useSession();
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <>
      <Head>
        <title>Albert Solver - Elevate your writing with AI</title>
        <link
          key={'canonical'}
          rel="canonical"
          href="https://albertsolver.com/"
        />

        <meta
          name="title"
          content="Albert Solver - Elevate your writing with AI"
        />
        <meta
          name="description"
          content="AI Writing Assistant is your go-to solution for expert help with essays and homework. Using cutting-edge technology, we provide advanced grammar checking, style suggestions, and personalized feedback to improve your writing and achieve academic success. Start seeing results with our AI-powered writing coach today."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://albertsolver.com/" />
        <meta
          property="og:title"
          content="Albert Solver - Elevate your writing with AI"
        />
        <meta
          property="og:description"
          content="AI Writing Assistant is your go-to solution for expert help with essays and homework. Using cutting-edge technology, we provide advanced grammar checking, style suggestions, and personalized feedback to improve your writing and achieve academic success. Start seeing results with our AI-powered writing coach today."
        />
        <meta
          property="og:image"
          content="https://albertsolver.com/images/banner.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://albertsolver.com/" />
        <meta
          property="twitter:title"
          content="Albert Solver - Elevate your writing with AI"
        />
        <meta
          property="twitter:description"
          content="AI Writing Assistant is your go-to solution for expert help with essays and homework. Using cutting-edge technology, we provide advanced grammar checking, style suggestions, and personalized feedback to improve your writing and achieve academic success. Start seeing results with our AI-powered writing coach today."
        />
        <meta
          property="twitter:image"
          content="https://albertsolver.com/images/banner.png"
        />
      </Head>
      <LoginModal isOpen={visible} closeHandler={closeHandler} />
      <Nav />
      <Container
        fluid
        css={{ bc: '$qq' }}
        display="flex"
        alignItems="center"
        direction="column"
      >
        <Row justify="center" align="center">
          <Text
            h1
            css={{
              pt: '$8',
              m: '$0',
              ta: 'center',
              lh: '$md',
              textGradient: '45deg, $blue600 -20%, $pink600 50%',
            }}
          >
            AI Writing Pro: Expert Support for Essays and Homework
          </Text>
        </Row>
        <Row justify="center">
          <Text
            hideIn={'sm'}
            h2
            css={{
              m: '$0',
              ta: 'center',
              lh: '$md',
              textGradient: '45deg, $purple600 -20%, $pink600 100%',
            }}
          >
            Achieve academic success with our advanced assistance!
          </Text>
        </Row>
        <Spacer y={1.5} />
        <Row justify="center">
          <video
            key={isDark ? '/video-dark.mp4' : '/video.mp4'}
            loop
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              maxWidth: '960px',
              height: 'auto',
              border: '1px solid #7a28c7',
              borderRadius: '10px',
            }}
          >
            <source
              src={isDark ? '/video-dark.mp4' : '/video.mp4'}
              type="video/mp4"
            />
          </video>
        </Row>
        <Spacer y={2} />
        <Row
          align="center"
          justify="center"
          wrap="wrap"
          css={{
            mw: '960px',
            '@xs': {
              flexWrap: 'nowrap',
              jc: 'space-between',
            },
          }}
        >
          <Col css={{ mw: '600px' }}>
            <Text h3>
              Try your best assistant, Be a Basic User in a second.
            </Text>
            <Text>
              Getting started is easy - all you need to do is a single click! No
              password is required - we&apos;ve made it simple and secure for
              you to access your account. Once you&apos;re in, you&apos;ll be
              able to explore all the features. Enjoy!
            </Text>
          </Col>
          {session ? (
            <Button
              color="secondary"
              size="xl"
              onPress={() => route.push('/study-room')}
            >
              Get Started
            </Button>
          ) : (
            <Button
              color="secondary"
              size="xl"
              onPress={() => setVisible(true)}
            >
              Get Started
            </Button>
          )}
        </Row>
      </Container>
      <Spacer y={2} />
      <Footer />
    </>
  );
};

export default Home;
