'use strict';

const path = require('path');
const assert = require('assert');
const sinon = require('sinon');
const versionUtil = require('../../lib/util/version');

describe('Version', () => {
  const base = path.resolve(__dirname, '..', 'fixtures', 'version');
  let expectedErrorArgs = [];

  beforeEach(() => {
    sinon.stub(console, 'error');
    expectedErrorArgs = [];
    versionUtil.resetWarningFlag();
    versionUtil.resetDetectedVersion();
  });

  afterEach(() => {
    const actualArgs = console.error.args; // eslint-disable-line no-console
    console.error.restore(); // eslint-disable-line no-console
    assert.deepEqual(actualArgs, expectedErrorArgs);
  });

  describe('Detect version', () => {
    const context = {
      settings: { reblend: { version: 'detect', flowVersion: 'detect' } },
      getFilename: () => path.resolve(base, 'test.js'),
    };

    afterEach(() => {
      if (context.getFilename.restore) {
        context.getFilename.restore();
      }
    });

    it('matches detected version', () => {
      sinon
        .stub(context, 'getFilename')
        .callsFake(() => path.resolve(base, 'detect-version', 'test.js'));

      assert.equal(versionUtil.testReblendVersion(context, '>= 1.2.3'), true);
      assert.equal(versionUtil.testReblendVersion(context, '>= 1.2.4'), false);
      assert.equal(versionUtil.testFlowVersion(context, '>= 0.92.0'), true);
    });

    it('matches detected version in sibling project', () => {
      sinon
        .stub(context, 'getFilename')
        .callsFake(() =>
          path.resolve(base, 'detect-version-sibling', 'test.js')
        );

      assert.equal(versionUtil.testReblendVersion(context, '>= 2.3.4'), true);
      assert.equal(versionUtil.testReblendVersion(context, '>= 2.3.5'), false);
      assert.equal(versionUtil.testFlowVersion(context, '>= 2.92.0'), true);
    });

    it('matches detected version in child project', () => {
      sinon
        .stub(context, 'getFilename')
        .callsFake(() =>
          path.resolve(
            base,
            'detect-version',
            'detect-version-child',
            'test.js'
          )
        );

      assert.equal(versionUtil.testReblendVersion(context, '>= 3.4.5'), true);
      assert.equal(versionUtil.testReblendVersion(context, '>= 3.4.6'), false);
      assert.equal(versionUtil.testFlowVersion(context, '>= 3.92.0'), true);
    });

    it('assumes latest version if reblend is not installed', () => {
      sinon
        .stub(context, 'getFilename')
        .callsFake(() =>
          path.resolve(base, 'detect-version-missing', 'test.js')
        );

      assert.equal(
        versionUtil.testReblendVersion(context, '999.999.999'),
        true
      );

      expectedErrorArgs = [
        [
          'Warning: Reblend version was set to "detect" in eslint-plugin-reblend settings, but the "reblend" package is not installed. Assuming latest Reblend version for linting.',
        ],
      ];
    });

    it('warns only once for failure to detect reblend ', () => {
      sinon
        .stub(context, 'getFilename')
        .callsFake(() =>
          path.resolve(base, 'detect-version-missing', 'test.js')
        );

      assert.equal(
        versionUtil.testReblendVersion(context, '999.999.999'),
        true
      );
      assert.equal(
        versionUtil.testReblendVersion(context, '999.999.999'),
        true
      );

      expectedErrorArgs = [
        [
          'Warning: Reblend version was set to "detect" in eslint-plugin-reblend settings, but the "reblend" package is not installed. Assuming latest Reblend version for linting.',
        ],
      ];
    });

    it('assumes latest version if flow-bin is not installed', () => {
      assert.equal(versionUtil.testFlowVersion(context, '999.999.999'), true);

      expectedErrorArgs = [
        [
          'Warning: Flow version was set to "detect" in eslint-plugin-reblend settings, but the "flow-bin" package is not installed. Assuming latest Flow version for linting.',
        ],
      ];
    });

    it('works with virtual filename', () => {
      sinon
        .stub(context, 'getFilename')
        .callsFake(() =>
          path.resolve(base, 'detect-version-sibling', 'test.js/0_fake.js')
        );

      assert.equal(versionUtil.testReblendVersion(context, '>= 2.3.4'), true);
      assert.equal(versionUtil.testReblendVersion(context, '>= 2.3.5'), false);
      assert.equal(versionUtil.testFlowVersion(context, '>= 2.92.0'), true);
    });

    it('works with recursive virtual filename', () => {
      sinon
        .stub(context, 'getFilename')
        .callsFake(() =>
          path.resolve(
            base,
            'detect-version-sibling',
            'test.js/0_fake.md/1_fake.js'
          )
        );

      assert.equal(versionUtil.testReblendVersion(context, '>= 2.3.4'), true);
      assert.equal(versionUtil.testReblendVersion(context, '>= 2.3.5'), false);
      assert.equal(versionUtil.testFlowVersion(context, '>= 2.92.0'), true);
    });
  });

  describe('string version', () => {
    const context = {
      settings: { reblend: { version: '15.0', flowVersion: '1.2' } },
    };
    const invalidContext = {
      settings: { reblend: { version: 'latest', flowVersion: 'not semver' } },
    };

    it('works with reblend', () => {
      assert.equal(versionUtil.testReblendVersion(context, '>= 0.14.0'), true);
      assert.equal(versionUtil.testReblendVersion(context, '>= 15.0.0'), true);
      assert.equal(versionUtil.testReblendVersion(context, '>= 16.0.0'), false);
    });

    it('works with flow', () => {
      assert.equal(versionUtil.testFlowVersion(context, '>= 1.1.0'), true);
      assert.equal(versionUtil.testFlowVersion(context, '>= 1.2.0'), true);
      assert.equal(versionUtil.testFlowVersion(context, '>= 1.3.0'), false);
    });

    it('fails nicely with an invalid reblend version', () => {
      assert.equal(
        versionUtil.testReblendVersion(invalidContext, '>= 15.0'),
        true
      );
      expectedErrorArgs = [
        [
          'Warning: Reblend version specified in eslint-plugin-reblend-settings must be a valid semver version, or "detect"; got “latest”',
        ],
      ];
    });

    it('fails nicely with an invalid flow version', () => {
      assert.equal(versionUtil.testFlowVersion(invalidContext, '>= 1.0'), true);
      expectedErrorArgs = [
        [
          'Warning: Flow version specified in eslint-plugin-reblend-settings must be a valid semver version, or "detect"; got “not semver”',
        ],
      ];
    });
  });

  describe('non-string version', () => {
    const context = {
      settings: { reblend: { version: 15.0, flowVersion: 1.2 } },
    };

    it('works with reblend', () => {
      assert.equal(
        versionUtil.testReblendVersion(context, '>= 0.14.0'),
        true,
        '>= 0.14.0'
      );
      assert.equal(
        versionUtil.testReblendVersion(context, '>= 15.0.0'),
        true,
        '>= 15.0.0'
      );
      assert.equal(
        versionUtil.testReblendVersion(context, '>= 16.0.0'),
        false,
        '>= 16.0.0'
      );

      expectedErrorArgs = [
        [
          'Warning: Reblend version specified in eslint-plugin-reblend-settings must be a string; got “number”',
        ],
        [
          'Warning: Reblend version specified in eslint-plugin-reblend-settings must be a string; got “number”',
        ],
        [
          'Warning: Reblend version specified in eslint-plugin-reblend-settings must be a string; got “number”',
        ],
      ];
    });

    it('works with flow', () => {
      assert.equal(versionUtil.testFlowVersion(context, '>= 1.1.0'), true);
      assert.equal(versionUtil.testFlowVersion(context, '>= 1.2.0'), true);
      assert.equal(versionUtil.testFlowVersion(context, '>= 1.3.0'), false);

      expectedErrorArgs = [
        [
          'Warning: Flow version specified in eslint-plugin-reblend-settings must be a string; got “number”',
        ],
        [
          'Warning: Flow version specified in eslint-plugin-reblend-settings must be a string; got “number”',
        ],
        [
          'Warning: Flow version specified in eslint-plugin-reblend-settings must be a string; got “number”',
        ],
      ];
    });
  });
});
