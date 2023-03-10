import Heading from "./components/heading/heading";
import CatImage from "./components/cat-image/cat-image";

const heading = new Heading();
heading.render('cat');

const catImage = new CatImage();
catImage.render();

import('HelloWorldApp/HelloWorldButton')
.then(helloModule => {
    const HelloWorldButton = helloModule.default;
    const helloButton = new HelloWorldButton();
    helloButton.render();
})
