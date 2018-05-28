/* eslint-disable */
export const constructors = {
  AsyncFunction: async function() {}.constructor,
  GeneratorFunction: function*() {}.constructor,
};

/**
 * This handle is used to call a unknown function.
 * Async functions are awaited, Generator functions are completed
 * and sync functions are called.
 * @param  {Function} fn       Function that needs to be called
 * @param  {Object}   scope    Scope that need to be given to the function
 * @param  {Array}    args     Args that need to be given to the function
 * @return {Promise<any>}      This promise is resolved once the function is completed. The return value of the function is returned.
 */
export default async function(fn, scope = {}, args = []) {
  const { AsyncFunction, GeneratorFunction } = constructors;

  switch (fn.constructor) {
    case GeneratorFunction:
      let res = [];
      const generator = fn.apply(scope, args);
      for (let promise of generator) {
        if (promise instanceof Promise) {
          const resolved = await promise;
          const value = generator.next(resolved);

          if (value) {
            res.push(value);
          }
        }
      }
      return res;
      break;
    case AsyncFunction:
      return await fn.apply(scope, args);
      break;
    default:
      return fn.apply(scope, args);
  }
}
