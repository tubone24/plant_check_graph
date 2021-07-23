import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import MaterialTable from 'material-table'
import tableIcons from '../components/tableIcons'
import plantDataState from '../store/plantData'
import showGraph from '../store/showGraph'
import dayjs from 'dayjs'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

const URI_ENDPOINT = "https://crisp-muskox-39.hasura.app/v1/graphql";

dayjs.extend(utc)
dayjs.extend(timezone)

const client = new ApolloClient({
  uri: URI_ENDPOINT,
  cache: new InMemoryCache()
});

export const Table = (): JSX.Element => {
  const [plantData, setPlantData] = useRecoilState(plantDataState)
  const [showG, setShowGraph] = useRecoilState(showGraph)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    getPlantData()
  }, [])
  const getPlantData = async() => {
    const { data } = await client.query({
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
    });
    // [[Prototype]]が邪魔でrecoilに渡せないので抜く
    const plantCheckerData = data.raspi_plant_checker.map((data) => ({id: data.id, light: data.light, moisture: data.moisture, timestamp: data.timestamp}))
    setPlantData(plantCheckerData)
    setLoading(false)
  }
  // @ts-ignore
  return (
    <div className="container">
      <main>
        {/*Actionsに複数Action設定するとTS2769で怒られるのでignore*/}
        {/* @ts-ignore */}
        <MaterialTable
          icons={tableIcons}
          columns={[
            {
              title: 'Date (' + dayjs.tz.guess() + ')',
              field: 'timestamp',
              defaultSort: 'desc',
              type: 'string',
              cellStyle: {
                backgroundColor: '#039be5',
                color: '#FFF',
              },
              headerStyle: {
                backgroundColor: '#039be5',
              },
            },
            {
              title: 'Moisture',
              field: 'moisture',
              type: 'numeric',
            },
            {
              title: 'Light',
              field: 'light',
              type: 'numeric'
            },
          ]}
          data={plantData}
          options={{
            filtering: false,
            grouping: false,
            exportButton: true,
            exportFileName: 'exported',
            headerStyle: {
              backgroundColor: '#01579b',
              color: '#FFF',
            },
            search: false,
          }}
          isLoading={loading}
          actions={[
            {
              // Issue: https://github.com/mbrn/material-table/issues/51
              //@ts-ignore
              icon: tableIcons.BarChartIcon,
              tooltip: 'Show Bar Chart',
              isFreeAction: true,
              disabled: loading,
              onClick: async () => {
                setShowGraph(!showG)
              },
            },
            {
              // Issue: https://github.com/mbrn/material-table/issues/51
              //@ts-ignore
              icon: tableIcons.Refresh,
              tooltip: 'Refresh Data',
              isFreeAction: true,
              disabled: loading,
              onClick: async () => {
                setLoading(true)
                await getPlantData()
              },
            },
          ]}
          title={
            <div className="header">
              <a href="https://plant-check-graph.vercel.app/">
                Plant Check Dashboard
              </a>
            </div>
          }
        />
      </main>

      <style jsx>{`
        a {
          color: inherit;
          text-decoration: none;
        }

        .header {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
        }

        .header a {
          color: #e77f2f;
          text-decoration: none;
        }

        .header img {
          height: 0.7em;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 1.5rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 0.9rem;
        }

        .code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default Table
