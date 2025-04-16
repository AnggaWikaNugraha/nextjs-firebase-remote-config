import app from '../client';
import { getRemoteConfig } from 'firebase/remote-config';
import remoteConfigDefaults from '../remote-config-value';

const remoteConfig = getRemoteConfig(app);

remoteConfig.settings = {
  minimumFetchIntervalMillis: 0,
  fetchTimeoutMillis: 60000,
};

remoteConfig.defaultConfig = remoteConfigDefaults;

export default remoteConfig;