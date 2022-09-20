const {
    queueUntilResolved,
    getWowPlayableSpec,
    getRealmList,
    getWowConnectedRealm,
    getMythicData
} = require('@dungeoneer-io/nodejs-utils');

const {
    convertCrealmIndexToMappingFixture,
    convertSpecIndexToSpecMap,
    convertDungeonIndexToDungeonMap
} = require('./bapi-mapper/fixture-set');
const {
    BAPI_MYTHIC_RESOURCE_TYPES
} = require('./entity-enums');


const getFixtures = async (lambdaEvent) => {
    const realmFixtures = await generateRealmFixtures();
    const classFixtures = await generateClassFixtures();
    const dungeonFixtures = await generateDungeonFixtures();

    const fixtureSet = {
        ...realmFixtures,
        ...classFixtures,
        ...dungeonFixtures
    };

    return fixtureSet;
};

const generateDungeonFixtures = async () => {
    const dungeonIndex = await getMythicData({ resource: BAPI_MYTHIC_RESOURCE_TYPES.DUNGEON });
    const dungeonsToProcess = dungeonIndex.dungeons.map(({ id }) => ({ id, resource: BAPI_MYTHIC_RESOURCE_TYPES.DUNGEON }));
    
    let dungeonResults = await queueUntilResolved(
        getMythicData,
        dungeonsToProcess,
        15,
        3,
        { showBar: true, debug: true }
    )
    .catch(o => console.log('uncaught exception deep within QUR'));

    const rawDungeonIndex = dungeonResults.results;

    const dungeonMap = convertDungeonIndexToDungeonMap(rawDungeonIndex);

    return { dungeonMap };
};

const generateClassFixtures = async () => {
    const specIndex = await getWowPlayableSpec();
    const specsToProcess = specIndex.character_specializations.map(({ id }) => ({ id }));

    let specResults = await queueUntilResolved(
        getWowPlayableSpec,
        specsToProcess,
        15,
        3,
        { showBar: true, debug: true }
    )
    .catch(o => console.log('uncaught exception deep within QUR'));

    const rawSpecIndex = specResults.results;

    const specMap = convertSpecIndexToSpecMap(rawSpecIndex);

    return { specMap };
};

const generateRealmFixtures = async () => {
    let realmList = await getRealmList();
    const itemsToProcess = realmList.map((o) => ({ id: o }));

    let results = await queueUntilResolved(
        getWowConnectedRealm,
        itemsToProcess,
        15,
        3,
        { showBar: true, debug: true }
    )
    .catch(o => console.log('uncaught exception deep within QUR'));

    const rawCrealmIndex = results.results;

    const rlmToCrlm = convertCrealmIndexToMappingFixture(rawCrealmIndex);

    return { rlmToCrlm };
};



module.exports = getFixtures;
