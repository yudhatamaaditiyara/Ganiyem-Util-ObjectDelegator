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
'use strict';

const {isObject, isFunction} = require('ganiyem-util-is');
const {IllegalArgumentError} = require('ganiyem-error');

/**
 */
class ObjectDelegator
{
  /**
   * @param {Object} target
   * @param {Object} source
   * @throws {IllegalArgumentError}
   */
  constructor(target, source){
    if (!isObject(target)) {
      throw new IllegalArgumentError('The target must be type of object');
    }
    if (!isObject(source)) {
      throw new IllegalArgumentError('The source must be type of object');
    }
    this.target = target;
    this.source = source;
  }
  
  /**
   * @param {(string|symbol)} name
   * @param {Object} [descriptor]
   * @returns {ObjectDelegator}
   */
  method(name, descriptor){
    return this.methodAs(name, name, descriptor);
  }

  /**
   * @param {(string|symbol)} name
   * @param {(string|symbol)} as
   * @param {Object} [descriptor]
   * @throws {IllegalArgumentError}
   * @returns {ObjectDelegator}
   */
  methodAs(name, as, descriptor){
    const source = this.source;
    const sourceDescriptor = Object.getOwnPropertyDescriptor(source, name);
    if (!sourceDescriptor) {
      throw new IllegalArgumentError('The source property "' + String(name) + '" is not defined');
    }
    if (!isFunction(sourceDescriptor.value)) {
      throw new IllegalArgumentError('The source property "' + String(name) + '" is not function');
    }
    const target = this.target;
    const objectDescriptor = {configurable: sourceDescriptor.configurable, enumerable: sourceDescriptor.enumerable, writable: sourceDescriptor.writable};
    Object.defineProperty(target, as, Object.assign(objectDescriptor, Object(descriptor), {
      value: function(){
        return source[name].apply(source, arguments);
      }
    }));
    return this;
  }

  /**
   * @param {(string|symbol)} name
   * @param {Array} args
   * @param {Object} [descriptor]
   * @returns {ObjectDelegator}
   */
  methodBind(name, args, descriptor){
    return this.methodBindAs(name, name, args, descriptor);
  }

  /**
   * @param {(string|symbol)} name
   * @param {(string|symbol)} as
   * @param {Array} args
   * @param {Object} [descriptor]
   * @throws {IllegalArgumentError}
   * @returns {ObjectDelegator}
   */
  methodBindAs(name, as, args, descriptor){
    const source = this.source;
    const sourceDescriptor = Object.getOwnPropertyDescriptor(source, name);
    if (!sourceDescriptor) {
      throw new IllegalArgumentError('The source property "' + String(name) + '" is not defined');
    }
    if (!isFunction(sourceDescriptor.value)) {
      throw new IllegalArgumentError('The source property "' + String(name) + '" is not function');
    }
    const target = this.target;
    const objectDescriptor = {configurable: sourceDescriptor.configurable, enumerable: sourceDescriptor.enumerable, writable: sourceDescriptor.writable};
    Object.defineProperty(target, as, Object.assign(objectDescriptor, Object(descriptor), {
      value: function(){
        return source[name].apply(source, args.concat(Array.from(arguments)));
      }
    }));
    return this;
  }

  /**
   * @param {(string|symbol)} name
   * @param {Object} [descriptor]
   * @returns {ObjectDelegator}
   */
  getter(name, descriptor){
    return this.getterAs(name, name, descriptor);
  }

  /**
   * @param {(string|symbol)} name
   * @param {(string|symbol)} as
   * @param {Object} [descriptor]
   * @throws {IllegalArgumentError}
   * @returns {ObjectDelegator}
   */
  getterAs(name, as, descriptor){
    const source = this.source;
    const sourceDescriptor = Object.getOwnPropertyDescriptor(source, name);
    if (!sourceDescriptor) {
      throw new IllegalArgumentError('The source property "' + String(name) + '" is not defined');
    }
    if (!sourceDescriptor.get) {
      throw new IllegalArgumentError('The source getter property "' + String(name) + '" is not defined');
    }
    const target = this.target;
    const objectDescriptor = {configurable: sourceDescriptor.configurable, enumerable: sourceDescriptor.enumerable};
    Object.defineProperty(target, as, Object.assign(objectDescriptor, Object(descriptor), {
      get: () => source[name]
    }));
    return this;
  }

  /**
   * @param {(string|symbol)} name
   * @param {Object} [descriptor]
   * @returns {ObjectDelegator}
   */
  setter(name, descriptor){
    return this.setterAs(name, name, descriptor);
  }

  /**
   * @param {(string|symbol)} name
   * @param {(string|symbol)} as
   * @param {Object} [descriptor]
   * @throws {IllegalArgumentError}
   * @returns {ObjectDelegator}
   */
  setterAs(name, as, descriptor){
    const source = this.source;
    const sourceDescriptor = Object.getOwnPropertyDescriptor(source, name);
    if (!sourceDescriptor) {
      throw new IllegalArgumentError('The source property "' + String(name) + '" is not defined');
    }
    if (!sourceDescriptor.set) {
      throw new IllegalArgumentError('The source setter property "' + String(name) + '" is not defined');
    }
    const target = this.target;
    const objectDescriptor = {configurable: sourceDescriptor.configurable, enumerable: sourceDescriptor.enumerable};
    Object.defineProperty(target, as, Object.assign(objectDescriptor, Object(descriptor), {
      set: (value) => source[name] = value
    }));
    return this;
  }

  /**
   * @param {(string|symbol)} name
   * @param {Object} [descriptor]
   * @returns {ObjectDelegator}
   */
  access(name, descriptor){
    return this.accessAs(name, name, descriptor);
  }

  /**
   * @param {(string|symbol)} name
   * @param {(string|symbol)} as
   * @param {Object} [descriptor]
   * @throws {IllegalArgumentError}
   * @returns {ObjectDelegator}
   */
  accessAs(name, as, descriptor){
    const source = this.source;
    const sourceDescriptor = Object.getOwnPropertyDescriptor(source, name);
    if (!sourceDescriptor) {
      throw new IllegalArgumentError('The source property "' + String(name) + '" is not defined');
    }
    if (!sourceDescriptor.get) {
      throw new IllegalArgumentError('The source getter property "' + String(name) + '" is not defined');
    }
    if (!sourceDescriptor.set) {
      throw new IllegalArgumentError('The source setter property "' + String(name) + '" is not defined');
    }
    const target = this.target;
    const objectDescriptor = {configurable: sourceDescriptor.configurable, enumerable: sourceDescriptor.enumerable};
    Object.defineProperty(target, as, Object.assign(objectDescriptor, Object(descriptor), {
      get: () => source[name],
      set: (value) => source[name] = value
    }));
    return this;
  }

  /**
   * @param {Object} target
   * @param {Object} source
   * @return {ObjectDelegator}
   */
  static create(target, source){
    return new this(target, source);
  }
}

/**
 * @+
 */
module.exports = ObjectDelegator;