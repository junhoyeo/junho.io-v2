import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Image from 'next/image';

import unicornImage from './assets/unicorn.png';

const HomePage: NextPage = () => {
  return (
    <Container>
      <Title>
        JUNHO YEO <br />
        SAILING TOWARD <br />
        THE <Image
          alt="unicorn"
          src={unicornImage}
          width={192}
          height={192}
        />{' '}
        FUTURE
      </Title>
      <Description>
        <ol>
          <li>① POSITION IN THE BEST ENVIRONMENT</li>
          <li>② DEVELOP MY OWN THESIS</li>
          <li>③ PROTOTYPE AND BUILD PRODUCTS</li>
        </ol>
      </Description>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  margin: 120px 0 12px;
  font-size: 3rem;
  text-align: center;
  line-height: 120%;

  img {
    margin-bottom: 4px;
    height: 3.2rem;
    width: 3.2rem;
    display: inline-block;
    vertical-align: text-bottom;
  }
`;
const Description = styled.ol`
  margin: 0;
  font-size: 18px;

  &,
  li {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`;
