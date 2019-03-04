import { expect, sinon } from '../globals';
import { stopPropagation } from '../../src/browser/stopPropagation';

describe('stopPropagation', function () {
  it('should call preventDefault and stopPropagation if they exist', function () {
    const mockEvent = {
      preventDefault: sinon.stub(),
      stopPropagation: sinon.stub(),
    };

    stopPropagation(mockEvent);

    expect(mockEvent.preventDefault).to.be.called;
    expect(mockEvent.stopPropagation).to.be.called;
  });

  it('should set a cancelBubble to true', function() {
    const mockEvent = {};

    stopPropagation(mockEvent);

    expect(mockEvent.cancelBubble).to.equal(true);
  });
});
