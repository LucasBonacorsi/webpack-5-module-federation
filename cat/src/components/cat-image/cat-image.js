import Cat from './cat.jpg'
import './cat-image.scss';

export default class CatImage {
    render() {
        const img = document.createElement('img');
        img.src = Cat;
        img.alt = 'Cat';
        img.classList.add('cat-image');
        const bodyElement = document.querySelector('body');
        bodyElement.appendChild(img);
    }
}