import { Container, Row, Spacer, Text } from '@nextui-org/react';
import { type GetServerSideProps, type NextPage } from 'next';
import { type BuiltInProviderType } from 'next-auth/providers';
import {
  type ClientSafeProvider,
  getProviders,
  type LiteralUnion,
} from 'next-auth/react';
import dynamic from 'next/dynamic';
import Footer from '../components/Footer';

// This is a workaround for hydration issues with Next.js
const Nav = dynamic(() => import('../components/Nav'), {
  ssr: false,
});

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};

const Home: NextPage<Props> = ({ providers }) => {
  return (
    <>
      <Nav providers={providers} />
      <Spacer y={2} />
      <Container lg>
        <Row justify="center" align="center">
          <Text
            h1
            size={'$4xl'}
            css={{
              textGradient: '45deg, $blue600 -20%, $pink600 50%',
            }}
            weight="bold"
          >
            Ace Your Homework
          </Text>
        </Row>
        <Spacer />
        <Row justify="center" align="center">
          <Text
            hideIn={'sm'}
            size={'$3xl'}
            h2
            css={{
              textGradient: '45deg, $purple600 -20%, $pink600 100%',
            }}
          >
            Our advanced technology takes the stress out of homework!
          </Text>
        </Row>
        <Spacer y={2} />
        <Row
          justify="center"
          align="center"
          css={{ justifyContent: 'center' }}
        ></Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
