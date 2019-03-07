import { expect, sinon } from '../globals';
import { loadFile } from '../../src/util/loadFile';

describe('util/loadFile', function() {
  const setAttributeStub = sinon.stub();
  const appendChildStub = sinon.stub();
  const callback = sinon.stub();
  let mockDoc;

  beforeEach(function() {
    mockDoc = {
      createElement: () => ({ setAttribute: setAttributeStub }),
      getElementsByTagName: () => [{ appendChild: appendChildStub }],
    };
  });

  afterEach(function() {
    setAttributeStub.reset();
    appendChildStub.reset();
    callback.reset();
  });

  it('should set proper attributes when loading a javascript file', function() {
    const mockSource = 'script.js';

    const file = loadFile(mockSource, callback, mockDoc);

    expect(setAttributeStub).to.be.calledWith('type', 'text/javascript');
    expect(setAttributeStub).to.be.calledWith('async', 'true');
    expect(setAttributeStub).to.be.calledWith('src', mockSource);
    expect(appendChildStub).to.be.calledWith(file);
  });

  it('should set proper attributes when loading a css file', function() {
    const mockSource = 'styles.css';

    const file = loadFile(mockSource, callback, mockDoc);

    expect(setAttributeStub).to.be.calledWith('type', 'text/css');
    expect(setAttributeStub).to.be.calledWith('rel', 'stylesheet');
    expect(setAttributeStub).to.be.calledWith('href', mockSource);
    expect(appendChildStub).to.be.calledWith(file);
  });

  it('should set onreadystatechange to call the calledback passed', function() {
    const mockSource = 'script.js';

    mockDoc.createElement = () => ({
      setAttribute: setAttributeStub,
      readyState: 'loaded',
    });

    const file = loadFile(mockSource, callback, mockDoc);
    file.onreadystatechange();

    expect(callback).to.be.called;
  });

  it('should set onload to call the callback passed', function() {
    const mockSource = 'script.js';

    const file = loadFile(mockSource, callback, mockDoc);
    file.onload();

    expect(callback).to.be.called;
  });
});
