import Tower from '../src/Tower';

describe('Tower', () => {
  let tower;

  beforeEach(() => {
    tower = new Tower('path/to/tower');
  });

  it('should consider last part of path as name', () => {
    expect(tower.name).toEqual('tower');
  });

  it('should use name when converting to string', () => {
    expect(tower.toString()).toEqual(tower.name);
  });
});
