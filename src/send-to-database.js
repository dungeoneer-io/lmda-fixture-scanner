const { getDb } = require('@dungeoneer-io/nodejs-utils');
const {
    COLLECTIONS,
    DATABASES
} = require('./entity-enums');


const insertPeriodFixture = async (periodid, payload) => {
    console.log('transmitting fixture...');
    const fixtureCollection = await getDb()
        .db(DATABASES.DEFAULT)
        .collection(COLLECTIONS.ZEPHYR_PERIOD_FIXTURES);
    
    await fixtureCollection.updateOne({
        _id: periodid
    },
    {
        $set: payload
    },
    {
        upsert: true
    });
};

module.exports = insertPeriodFixture;

