const {
    connectToBlizzard,
    initDb,
    lambdaTry200Catch500
} = require('@dungeoneer-io/nodejs-utils');
const getFixtures = require('./get-fixtures');
const getCurrentPeriod = require('./get-current-period');
const sendToDatabase = require('./send-to-database');

const obtainFixtures = async (lambdaEvent) => {
    await initDb();
    await connectToBlizzard();
    
    const CurrentPeriod = await getCurrentPeriod();
    const fixtureSet = await getFixtures(lambdaEvent);
    await sendToDatabase(CurrentPeriod, fixtureSet);
};

exports.handler = async (event = {}, context) => {
    console.log('Dungeoneer.io');
    console.log('lmda-fixture-scanner');
    console.log('================');

    await lambdaTry200Catch500({
        context,
        event,
        notifyOn200: true,
        fn200: obtainFixtures,
        fn500: (e) => console.log('error', e)
    });
};
