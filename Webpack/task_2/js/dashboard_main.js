import $ from 'jquery';
import _ from 'lodash';
import '../css/main.css';

$(document).ready(() => {
  const $body = $('body');

  $body.prepend('<div id="logo"></div>');
  $body.append('<p>Holberton Dashboard</p>');
  $body.append('<p>Dashboard data for the students</p>');

  const $button = $('<button id="start">Click here to get started</button>');
  $body.append($button);

  $body.append("<p id='count'></p>");
  $body.append('<p>Copyright - Holberton School</p>');

  let count = 0;

  function updateCounter() {
    count += 1;
    $('#count').text(`${count} clicks on the button`);
  }

  const debouncedUpdate = _.debounce(updateCounter, 500);
  $button.on('click', debouncedUpdate);
});
