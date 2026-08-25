import $ from 'jquery';
import _ from 'lodash';
import './body.css';

$(() => {
  const $body = $('body');

  $body.append('<p class="dashboard-text">Dashboard data for the students</p>');

  const $button = $('<button id="start">Click here to get started</button>');
  $body.append($button);

  $body.append("<p id='count'></p>");

  let count = 0;

  function updateCounter() {
    count += 1;
    $('#count').text(`${count} clicks on the button`);
  }

  const debouncedUpdate = _.debounce(updateCounter, 500);
  $button.on('click', debouncedUpdate);
});
