import $ from 'jquery';
import './header.css';

$(() => {
  const $header = $('<header></header>');
  const $logo = $('<div id="logo"></div>');
  const $h1 = $('<h1>Holberton Dashboard</h1>');

  $header.append($logo);
  $header.append($h1);
  $('body').prepend($header);

  console.log('Init header');
});
