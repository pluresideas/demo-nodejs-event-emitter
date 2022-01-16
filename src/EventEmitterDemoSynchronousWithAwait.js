/**
 *
 * To take full advantage of EventListener the listeners should execute
 * asynchronous non-blocking code. However, wrapping a synchronous code
 * into an async function is not enough. The 2nd listener is still
 * blocked and waiting for the async function to complete
 *
 * Here is an output from running this code:
 * 11:13:52 Listener 1 - processing event
 * 11:13:52 Listener 1 - about to await
 * 11:13:57 Listener 2 - processing event
 * 11:13:57 Listener 2 - processed: Test Event
 * 11:13:57 Listener 1 - await completed
 * 11:13:57 Listener 1 - processed: Test Event
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

  async function extracted() {
    for (let i = 0; i < 6e9; i += 1) {
      // Intentionally empty
    }
  }

  console.log(`${time()} Listener 1 - about to await`);
  await extracted();
  console.log(`${time()} Listener 1 - await completed`);
  console.log(`${time()} Listener 1 - processed: ${message}`);
});

// Listener 2
EventBus.on('event', (message) => {
  console.log(`${time()} Listener 2 - processing event`);
  console.log(`${time()} Listener 2 - processed: ${message}`);
});

// Emitting event
EventBus.emit('event', 'Test Event');
