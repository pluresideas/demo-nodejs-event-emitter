# Demo Node.js Event Emitter

This repo demonstrates use of Node.js Event Emitter.

Node.js Event Emitter is used when there is a desire to decompose a codebase into
components or services invoked using a pub-sub like asynchronous pattern. 
However, typically when we talk about pub-sub pattern we refer to distributed decomposed systems. This is not the case here as all components exist in the same code repository and run in the same Node.js runtime.  

Keep in mind that using Node.js Event Emitter does not make our code automatically non-blocking, asynchronous. A special care needs to be taken so that event listeners (subscribers) do not block each other, that is the event listeners should execute code asynchronously.

In addition, when using this pattern event emitters (publishers) do not care about the result of the actions taken by the event listeners. There is no callback or return value. If these actions are critical then failures need to be handled. 

#### Event Emitter executes code synchronously
- [Synchronous Code](src/EventEmitterDemoSynchronousCode.js)
- [Synchronous Code With Await](src/EventEmitterDemoSynchronousWithAwait.js)


#### Event Emitter executes code asynchronously
- [Asynchronous Code With Set Timout](src/EventEmitterDemoAsynchronousSetTimeout.js)
- [Asynchronous Code With Set Immediate](src/EventEmitterDemoAsynchronousSetImmediate.js)
