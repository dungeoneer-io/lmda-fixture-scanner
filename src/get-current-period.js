const {
    getMythicData
} = require('@dungeoneer-io/nodejs-utils');

const {
    BAPI_MYTHIC_RESOURCE_TYPES
} = require('./entity-enums');

const getCurrentPeriod = async () => {
    const periodIndex = await getMythicData({ resource: BAPI_MYTHIC_RESOURCE_TYPES.PERIOD });
    const CURRENT_PERIOD = periodIndex.current_period.id;
    return CURRENT_PERIOD;
};

module.exports = getCurrentPeriod;
