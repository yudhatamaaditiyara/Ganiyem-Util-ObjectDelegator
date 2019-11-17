/**
 * Copyright (C) 2019 Yudha Tama Aditiyara
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const assert = require('assert');
const ObjectDelegator = require('../../');
const helper = require('../helper');

describe('ObjectDelegator#accessAs', () => {
  it('must be work called with ("access", "accessAs")', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);

    assert.ok(object.accessAs('access', 'accessAs') instanceof ObjectDelegator);

    let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'accessAs');
    let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'access');

    assert.strictEqual(typeof targetDescriptor.get, 'function');
    assert.strictEqual(typeof targetDescriptor.set, 'function');
    assert.strictEqual(targetDescriptor.value, void 0);
    assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
    assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
    assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);

    assert.strictEqual(target.accessAs, 'access');
    assert.strictEqual(target.accessAs, source.access);

    target.accessAs = 'wrap-value';
    assert.strictEqual(target.accessValue, void 0);
    assert.strictEqual(source.accessValue, 'wrap-value');

    assert.notStrictEqual(targetDescriptor.set, sourceDescriptor.set);
    assert.notStrictEqual(targetDescriptor.get, sourceDescriptor.get);
  });

  it('must be work called with ("access", "accessAs", #descriptor)', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);
    let descriptor = {get: () => {}, set: () => {}, configurable: false, enumerable: false};

    assert.ok(object.accessAs('access', 'accessAs', descriptor) instanceof ObjectDelegator);

    let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'accessAs');
    let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'access');

    assert.strictEqual(typeof targetDescriptor.get, 'function');
    assert.strictEqual(typeof targetDescriptor.set, 'function');
    assert.strictEqual(targetDescriptor.value, void 0);
    assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
    assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
    assert.strictEqual(targetDescriptor.writable, descriptor.writable);

    assert.strictEqual(target.accessAs, 'access');
    assert.strictEqual(target.accessAs, source.access);

    target.accessAs = 'wrap-value';
    assert.strictEqual(target.accessValue, void 0);
    assert.strictEqual(source.accessValue, 'wrap-value');

    assert.notStrictEqual(targetDescriptor.get, descriptor.get);
    assert.notStrictEqual(targetDescriptor.set, descriptor.set);
    assert.notStrictEqual(targetDescriptor.get, sourceDescriptor.get);
    assert.notStrictEqual(targetDescriptor.set, sourceDescriptor.set);
  });
});