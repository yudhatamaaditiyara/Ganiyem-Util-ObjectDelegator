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

describe('ObjectDelegator#setterAs', () => {
  it('must be work called with ("setter", "setterAs")', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);

    assert.ok(object.setterAs('setter', 'setterAs') instanceof ObjectDelegator);

    let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'setterAs');
    let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'setter');

    assert.strictEqual(targetDescriptor.get, void 0);
    assert.strictEqual(typeof targetDescriptor.set, 'function');
    assert.strictEqual(targetDescriptor.value, void 0);
    assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
    assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
    assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);

    target.setterAs = 'wrap-value';
    assert.strictEqual(target.setterValue, void 0);
    assert.strictEqual(source.setterValue, 'wrap-value');
    assert.notStrictEqual(targetDescriptor.set, sourceDescriptor.set);
  });

  it('must be work called with ("setter", "setterAs", #descriptor)', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);
    let descriptor = {get: () => {}, set: () => {}, configurable: false, enumerable: false};

    assert.ok(object.setterAs('setter', 'setterAs', descriptor) instanceof ObjectDelegator);

    let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'setterAs');
    let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'setter');

    assert.strictEqual(typeof targetDescriptor.get, 'function');
    assert.strictEqual(typeof targetDescriptor.set, 'function');
    assert.strictEqual(targetDescriptor.value, void 0);
    assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
    assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
    assert.strictEqual(targetDescriptor.writable, descriptor.writable);

    target.setterAs = 'wrap-value';
    assert.strictEqual(target.setterValue, void 0);
    assert.strictEqual(source.setterValue, 'wrap-value');
    assert.strictEqual(targetDescriptor.get, descriptor.get);
    assert.notStrictEqual(targetDescriptor.set, descriptor.set);
    assert.notStrictEqual(targetDescriptor.set, sourceDescriptor.set);
  });
});