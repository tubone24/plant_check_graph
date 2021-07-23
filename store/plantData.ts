import { atom } from 'recoil'

const plantData = atom({
  key: 'plantData',
  default: [
    {
      id: 0,
      timestamp: '2021-07-01T07:54:17.186706+00:00',
      moisture: 0,
      light: 0
    },
  ],
  dangerouslyAllowMutability: true,
})

export default plantData
