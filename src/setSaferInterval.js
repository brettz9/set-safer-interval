/**
 * Return a value to control whether to increase/decrease the timer, e.g.,
 *   to adjust if there is precession.
 * @callback Timer
 * @param {Float} interval Convenience if wish to conditionally add back
 * interval.
 * @returns {?Float}
 */

// const _Date = Date;

/**
 * @param {Timer} userTimeout
 * @param {Float} [interval=1000]
 * @param {PlainObject} [cfg={}]
 * @param {boolean} cfg.exitNoThrow
 * @returns {void}
 */
function setSaferInterval (userTimeout, interval = 1000, {
  exitNoThrow = false
} = {}) {
  let timeoutID;
  let expected = Date.now() + interval;

  /**
   * @throws {Error}
   * @returns {void}
   */
  function timeout () {
    const now = Date.now();
    // console.log('new timeout check', new _Date(now));
    // console.log('Date.now()', Date.now());
    const timeDrift = now - expected;
    // Overshooting should not occur
    /* c8 ignore start */
    if (timeDrift > interval) {
      if (exitNoThrow) {
        return;
      }
      throw new Error(
        `Unexpected condition: ${timeDrift} time drift ` +
        `exceeding interval ${interval}`
      );
    }
    /* c8 ignore stop */

    const offset = userTimeout(interval) || 0;

    expected += interval + offset;

    // console.log(
    //   'offset', offset,
    //   '\ntime drift (minutes)', timeDrift / 1000 / 60,
    //   '\nexpected', new _Date(expected),
    //   '\nnew delay', Math.max(0, interval - timeDrift) + offset
    // );

    // Adjust for drift
    timeoutID = setTimeout(
      timeout, Math.max(0, interval - timeDrift) + offset
    );
  }

  timeoutID = setTimeout(timeout, interval);

  return function clear () {
    clearTimeout(timeoutID);
  };
}

export default setSaferInterval;
