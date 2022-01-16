/**
 * When event listeners execute synchronous blocking code as seen in this example,
 * the next listener is not notified until the first listener completes execution
 * of the synchronous blocking code.
 *
 * Here is an output from running this code:
 *
 * 11:16:40 Listener 1 - processing event
 * 11:16:45 Listener 1 - processed: Test Event
 * 11:16:45 Listener 2 - processing event
 * 11:16:45 Listener 2 - processed: Test Event
 */

const { EventEmitter } = require('events');

const time = () => {
  const currentDate = new Date();
  return `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
};

const EventBus = new EventEmitter();

// Listener 1
EventBus.on('event', (message) => {
  console.log(`${time()} Listener 1 - processing event`);
  for (let i = 0; i < 6e9; i += 1) {
    // Intentionally empty
  }
  console.log(`${time()} Listener 1 - processed: ${message}`);
});

// Listener 2
EventBus.on('event', (message) => {
  console.log(`${time()} Listener 2 - processing event`);
  console.log(`${time()} Listener 2 - processed: ${message}`);
});

// Emitting event
EventBus.emit('event', 'Test Event');
