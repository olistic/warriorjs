/* eslint-disable */
export const constructors = {
  AsyncFunction: async function() {}.constructor,
  GeneratorFunction: function*() {}.constructor,
};

export default async function(callback, scope = {}, args = []) {
  const { AsyncFunction, GeneratorFunction } = constructors;

  switch (callback.constructor) {
    case GeneratorFunction:
      let res = [];
      const generator = callback.apply(scope, args);
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
      return await callback.apply(scope, args);
      break;
    default:
      return callback.apply(scope, args);
  }
}
