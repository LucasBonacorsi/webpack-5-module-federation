import helloWorldButton from './components/button/hello-world-button';
import Heading from './components/heading/heading';

const heading = new Heading()
heading.render('hello, webpack');


const helloWordButton = new helloWorldButton();
helloWordButton.render();

