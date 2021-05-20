# set-safer-interval

This project is an attempt to allow interval setting which can be updated
closer to the arriving time to occur at a greater frequency.

## Installation

```shell
npm i set-safer-interval
```

## Usage

Here we set a timer to run every 50 minutes, but when reaching the desired
hour, we check whether we are under 15 minutes past the hour, and if so,
we increment the next interval step to run in 40 minutes (as we know that
should be safe not to overpass the hour). If we were to run it at that
time, we would risk running it twice (50 minutes later could still be within
the hour). Finally, if it is equal to or over 15 minutes, we run the desired
function and return to incrementing on intervals of 50 minutes (until the
same hour on the next day).

We could perform a more complex check to increment at a more fine-tuned
range, so that we narrowed things down running at minute and/or second
intervals, for example.

<!-- Note that for testing, you may wish to use this with `mockdate`. -->
```js
import setSaferInterval from 'set-safer-interval';

const fortyMinutesInMilliseconds = 40 * 60 * 1000;
const fiftyMinutesInMilliseconds = 50 * 60 * 1000;

// The `interval` is just passsed in for a convenience. It equals
//  `fiftyMinutesInMilliseconds`
const clear = setSaferInterval(
  (interval) => {
    const date = new Date();
    // 12pm UTC == 8am EST (8:00am-8:59am)
    if (date.getUTCHours() === 12) { // 0-23 UTC
      // To avoid running twice in the hour, bump forty minutes before
      //   next check
      if (date.getUTCMinutes() < 15) {
        // We landed under 15 minutes, so jumping 40
        return fortyMinutesInMilliseconds - interval;
      }

      // 8:15am-8:59am EST (so safe to increment 50 minutes without
      //   recurring within the 8am EST (12pm UTC) window)
      doSomething();
    }

    // Keep normal supplied interval (`fiftyMinutesInMilliseconds`); we could
    //   also just return `undefined`
    return 0;
  },
  fiftyMinutesInMilliseconds,
  // The following config object is optional
  {
    // May need to set to `true` for certain testing environments which
    //   break the Date after tests while still allowing it to run
    exitNoThrow: false
  }
);

// You can optionally clear the "interval" later (behind the scenes, it
//   actually  calls `clearTimeout` against the last `setTimeout` call)
// clear();
```

## Changelog

The changelog can be found on [CHANGES.md](./CHANGES.md).

## Authors and license

[Brett Zamir](http://brett-zamir.me/) and
[contributors](https://github.com/brettz9/set-safer-interval/graphs/contributors).

MIT License, see the included [LICENSE-MIT.tx](LICENSE-MIT.txt) file.

## To-dos

1. See about using `mockdate` for tests: <https://github.com/boblauer/MockDate/issues/46>
    and uncomment above reference in README if available
