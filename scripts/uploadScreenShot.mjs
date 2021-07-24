import { ApolloClient, gql, HttpLink, InMemoryCache  } from '@apollo/client'
// "fetch" has not been found globally and no fetcher has been configured. To fix this, install a fetch package (like https://www.npmjs.com/package/cross-fetch), instantiate the fetcher, and pass it into your HttpLink constructor.
import fetch from 'cross-fetch';
import fs from 'fs'
import axios from 'axios'

const filePath = './cypress/screenshots/screenshot.spec.js/screenShot.png';
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
const imgurClientId = process.env.IMGUR_CLIENT_ID;

const URI_ENDPOINT = "https://crisp-muskox-39.hasura.app/v1/graphql";

const client = new ApolloClient({
  link: new HttpLink({ uri: URI_ENDPOINT, fetch }),
  cache: new InMemoryCache()
});

const base64Data = fs.readFileSync(filePath, { encoding: 'base64' });

const data = {
  image: base64Data.replace(new RegExp('data.*base64,'), ''),
  type: 'base64'
}

const config = {
  headers: {
    Authorization: `Client-ID ${imgurClientId}`
  }
}

axios.post('https://api.imgur.com/3/image', data, config).then((resp) => {
  const imageLink = resp.data.data.link
  console.log(imageLink)
  client.query({
    query: gql`
        query MyQuery {
            raspi_plant_checker {
                id
                light
                moisture
                timestamp
            }
        }
    `
  }).then((resp) => {
    const latestData = resp.data.raspi_plant_checker[resp.data.raspi_plant_checker.length - 1]
    const slackPayload = {
      text: `*How are you?* \n<${netatmoUrl}|Click here> for details! \n${imageLink}`,
      attachments: [
        {
          fields: [
            {
              title: 'Moisture',
              value: latestData.moisture,
              short: 'true'
            },
            {
              title: 'Light',
              value: latestData.light,
              short: 'true'
            },
          ]
        }
      ]
    }
    axios.post(slackWebhookUrl, slackPayload).then((resp) => {
      console.log("OK")
    })
  })
  }
)
