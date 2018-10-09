import util from 'util';

function think() {
  return unit => ({
    description: 'Thinks out loud (`console.log` replacement).',
    perform(...args) {
      const thought = args.length > 0 ? util.format(...args) : 'nothing';
      unit.log(`thinks ${thought}`);
    },
  });
}

export default think;
