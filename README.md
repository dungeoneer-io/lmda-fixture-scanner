# lmda-fixture-scanner
Obtains time-sensitive fixtures that are critical to operating with point-in-time Blizzard data

### Working With This
- Clone, `npm i`
- `npm run local` to fire the lambda method locally
- `npm run test` to run through jest tests written
- Deploys to lambda on commit push to `main` branch on github

### What to Have
- Blizzard API Developer Account and API Key+Secret
- AWS Account, Access to create Lambda Functions
- Github Account to deploy and use Github Actions
- Mongo database, write access connection string

### What Happens?
- Pull time-volatile data for a given period and store them in the `ZPH_PeriodFixtures` collection when called


`ZPH_PeriodFixtures`:
```js
{
    _id: 872,
    rlmToCrlm: {
        '1': 3694,
        '2': 1168,
        '3': 151
    },
    specMap: {
        62: {
            c: 8,
            r: 3
        },
        63: {
            c: 2,
            r: 1
        }
    },
    dungeonMap: {
        166: [1800000, 1440000, 1080000],
        169: [1900000, 1340000, 1030000]
    }
}
```


### Resource Usage
Lambda Function Using:
- 128MB Memory (~100MB used)
~~- Billable Duration over snapshot: ~4260ms~~

### Plugging into the Cloud
- Deploy to github to leverage GitHub Actions written in .github\workflows
- Add projects secrets to github repo `AWS_ACCESS_KEY_ID`, `DISCORD_NOTIFICATION_WEBHOOK`, and `AWS_SECRET_ACCESS_KEY`
- Will need to have a named lambda function already created by the name in deploy yml. `lmda-fixture-scanner` here
- Pre-made lambda is going to need environment variables on board, also make local uncommitted .env with those same values. It'll make sure local runs work


        Much of this will be in a Terraform file so it doesn't need to be done manually
- Pre-made lambda timeout increased to like 15 seconds

### @dungeoneer-io/nodejs-utils
See [@dungeoneer-io/nodejs-utils](https://github.com/dungeoneer-io/nodejs-utils) for hints on how to configure environment variables in dotenv