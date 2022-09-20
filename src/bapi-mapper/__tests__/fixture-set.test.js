const { describe, expect, test } = require('@jest/globals');

const {
    convertCrealmIndexToMappingFixture,
    convertSpecIndexToSpecMap,
    convertDungeonIndexToDungeonMap
} = require('../fixture-set');

const ArrayOfDungeons = require('./__fixtures__/array-of-dungeons.json');
const ArrayOfSpecs = require('./__fixtures__/array-of-specs.json');
const ArrayOfCrealms = require('./__fixtures__/array-of-crealms.json');

describe('transformers', () => {
    test('convertCrealmIndexToMappingFixture', () => {
        const actual = convertCrealmIndexToMappingFixture(ArrayOfCrealms);
        expect(actual).toMatchSnapshot();
    });

    test('convertSpecIndexToSpecMap', () => {
        const result = convertSpecIndexToSpecMap(ArrayOfSpecs);
        expect(result).toMatchSnapshot();
    });

    test('convertDungeonIndexToDungeonMap', () => {
        const result = convertDungeonIndexToDungeonMap(ArrayOfDungeons);
        expect(result).toMatchSnapshot();
    });
});