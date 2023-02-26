import Heading from "./components/heading/heading";
import CatImage from "./components/cat-image/cat-image";
import React from 'react';

const heading = new Heading();
heading.render('cat');

const catImage = new CatImage();
catImage.render();
