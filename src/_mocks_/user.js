import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';
import { fTimeRange} from 'utils/formatTime';
// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: fTimeRange(faker.date.past(),0),
  company: sample([
    'One Times',
    'Every days',
    'Mon to Fri ',
    '1 minutes',
    '5 minutes',
    '1 hours', 
  ]),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    '1 weeks',
    '1 days ',
    '4 hours',
    '1 minutes',
    '5 minutes',
    '1 hours',
    
  ])
}));

export default users;
