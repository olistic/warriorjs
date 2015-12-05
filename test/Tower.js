import chai from 'chai';
import Tower from '../src/Tower';

chai.should();

describe('Tower', function () {
  beforeEach(function () {
    this.tower = new Tower('path/to/tower');
  });

  it('should consider last part of path as name', function () {
    this.tower.name.should.equal('tower');
  });

  it('should use name when converting to string', function () {
    this.tower.toString().should.equal(this.tower.name);
  });
});
