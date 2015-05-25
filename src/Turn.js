class Turn {
	constructor(actions, senses) {
		var turn = this,
			_action = null,
			_senses = {};

		Object.keys(actions).forEach((name) => {
			Object.defineProperty(this, name, {
				value: (...args) => {
					if (_action) {
						throw new Error('Only one action can be performed per turn.');
					}
					_action = [name, args];
				}
			});
		});

		Object.keys(senses).forEach((name) => {
			var sense = senses[name];
			_senses[name] = sense;
			Object.defineProperty(this, name, {
				value: (...args) => {
					return _senses[name].perform(...args);
				}
			});
		});
		
		Object.defineProperty(this, 'getAction', {
			value: () => {
				return _action;
			}
		});
	}
}

export default Turn;
