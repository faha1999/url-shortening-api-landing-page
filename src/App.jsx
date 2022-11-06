import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ShortenLink } from './components/ShortenLink';
import { Statistic } from './components/Statistic';

export const App = () => {
  return (
    <>
      <Header />
      <Hero />
      <ShortenLink />
      <Statistic />
    </>
  );
};
