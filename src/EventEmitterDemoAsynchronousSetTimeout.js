/**
 *
 * To take full advantage of EventListener the listeners should execute
 * asynchronous non-blocking code. Here we are using setTimeout() in order
 * to execute code asynchronously.
 *
 * Here is an output from running this code:
 *
 * 11:45:54 Listener 1 - processing event
 * 11:45:54 Listener 1 - about to execute setTimeout
 * 11:45:54 Listener 1 - setTimeout completed
 * 11:45:54 Listener 1 - processed: Test Event
 * 11:45:54 Listener 2 - processing event
 * 11:45:54 Listener 2 - processed: Test Event
 * 11:45:59 Listener 1 - finished the long loop
 */

const { EventEmitter } = require('events');

const time = () => {
  const currentDate = new Date();
  return `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
};

const EventBus = new EventEmitter();

// Listener 1
EventBus.on('event', async (message) => {
  console.log(`${time()} Listener 1 - processing event`);

  function extracted() {
    for (let i = 0; i < 6e9; i += 1) {
      // Intentionally empty
    }
    console.log(`${time()} Listener 1 - finished the long loop`);
  }

  console.log(`${time()} Listener 1 - about to execute setTimeout`);
  setTimeout(extracted, 0);
  console.log(`${time()} Listener 1 - setTimeout completed`);
  console.log(`${time()} Listener 1 - processed: ${message}`);
});

// Listener 2
EventBus.on('event', (message) => {
  console.log(`${time()} Listener 2 - processing event`);
  console.log(`${time()} Listener 2 - processed: ${message}`);
});

// Emitting event
EventBus.emit('event', 'Test Event');
