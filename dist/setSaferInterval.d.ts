export default setSaferInterval;
export type Float = number;
/**
 * Return a value to control whether to increase/decrease the timer, e.g.,
 *   to adjust if there is precession.
 */
export type Timer = (interval: Float) => Float | null;
/**
 * @typedef {number} Float
 */
/**
 * Return a value to control whether to increase/decrease the timer, e.g.,
 *   to adjust if there is precession.
 * @callback Timer
 * @param {Float} interval Convenience if wish to conditionally add back
 * interval.
 * @returns {?Float}
 */
/**
 * @param {Timer} userTimeout
 * @param {Float} [interval]
 * @param {object} [cfg]
 * @param {boolean} [cfg.exitNoThrow]
 * @returns {() => void}
 */
declare function setSaferInterval(userTimeout: Timer, interval?: Float, { exitNoThrow }?: {
    exitNoThrow?: boolean | undefined;
}): () => void;
//# sourceMappingURL=setSaferInterval.d.ts.map