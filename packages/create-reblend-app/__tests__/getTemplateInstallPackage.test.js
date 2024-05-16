/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { getTemplateInstallPackage } = require('../createReblendApp');

describe('getTemplateInstallPackage', () => {
  it('no options gives creba-template', async () => {
    await expect(getTemplateInstallPackage()).resolves.toBe('creba-template');
  });

  it('creba-template gives creba-template', async () => {
    await expect(getTemplateInstallPackage('creba-template')).resolves.toBe(
      'creba-template'
    );
  });

  it('creba-template-typescript gives creba-template-typescript', async () => {
    await expect(
      getTemplateInstallPackage('creba-template-typescript')
    ).resolves.toBe('creba-template-typescript');
  });

  it('typescript gives creba-template-typescript', async () => {
    await expect(getTemplateInstallPackage('typescript')).resolves.toBe(
      'creba-template-typescript'
    );
  });

  it('typescript@next gives creba-template-typescript@next', async () => {
    await expect(getTemplateInstallPackage('typescript@next')).resolves.toBe(
      'creba-template-typescript@next'
    );
  });

  it('creba-template@next gives creba-template@next', async () => {
    await expect(
      getTemplateInstallPackage('creba-template@next')
    ).resolves.toBe('creba-template@next');
  });

  it('creba-template-typescript@next gives creba-template-typescript@next', async () => {
    await expect(
      getTemplateInstallPackage('creba-template-typescript@next')
    ).resolves.toBe('creba-template-typescript@next');
  });

  it('@iansu gives @iansu/creba-template', async () => {
    await expect(getTemplateInstallPackage('@iansu')).resolves.toBe(
      '@iansu/creba-template'
    );
  });

  it('@iansu/creba-template gives @iansu/creba-template', async () => {
    await expect(
      getTemplateInstallPackage('@iansu/creba-template')
    ).resolves.toBe('@iansu/creba-template');
  });

  it('@iansu/creba-template@next gives @iansu/creba-template@next', async () => {
    await expect(
      getTemplateInstallPackage('@iansu/creba-template@next')
    ).resolves.toBe('@iansu/creba-template@next');
  });

  it('@iansu/creba-template-typescript@next gives @iansu/creba-template-typescript@next', async () => {
    await expect(
      getTemplateInstallPackage('@iansu/creba-template-typescript@next')
    ).resolves.toBe('@iansu/creba-template-typescript@next');
  });

  it('http://example.com/creba-template.tar.gz gives http://example.com/creba-template.tar.gz', async () => {
    await expect(
      getTemplateInstallPackage('http://example.com/creba-template.tar.gz')
    ).resolves.toBe('http://example.com/creba-template.tar.gz');
  });
});
