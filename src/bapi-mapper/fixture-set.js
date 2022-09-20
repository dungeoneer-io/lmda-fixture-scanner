const ROLE_NAME_TO_ID = {
    'TANK': 1,
    'HEALER': 2,
    'DAMAGE': 3
};

const convertCrealmIndexToMappingFixture = (crealmIndex) => Object.assign({},
    ...crealmIndex.flatMap(({ id: crealmId, realms }) =>
        realms.map(({ id: realmId }) => ({ [realmId]: crealmId }))
    )
);

const convertSpecIndexToSpecMap = (specIndex) => Object.assign({},
    ...specIndex.map(({ id, playable_class: { id: c }, role: { type: roleType } }) => ({
        [id]: {
            c,
            r: ROLE_NAME_TO_ID[roleType]
        }
    }))
);

const convertDungeonIndexToDungeonMap = (dungeonIndex) => Object.assign({},
    ...dungeonIndex
        .filter(({ is_tracked }) => is_tracked)
        .map(({ id, keystone_upgrades }) => ({
            [id]: keystone_upgrades.map(({ qualifying_duration }) => qualifying_duration)
        }))
);

module.exports = {
    convertCrealmIndexToMappingFixture,
    convertSpecIndexToSpecMap,
    convertDungeonIndexToDungeonMap
};
