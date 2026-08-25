import $ from 'jquery';
import './footer.css';

$(() => {
  const $footer = $('<footer></footer>');
  const $copyright = $('<p>Copyright - Holberton School</p>');

  $footer.append($copyright);
  $('body').append($footer);
});
