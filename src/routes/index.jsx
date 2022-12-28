import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Actors, MovieInfo, Movies, Profile } from '../components';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Movies />} />
    <Route path="/movie/:id" element={<MovieInfo />} />
    <Route path="/actor/:id" element={<Actors />} />
    <Route path="/profile/:id" element={<Profile />} />
  </Routes>
);

export default AppRoutes;
