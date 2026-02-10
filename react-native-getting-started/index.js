import { registerRootComponent } from 'expo';

import App from './App';
import HelloWorldDemo from './HelloWorldDemo';
import ProfileDemo from './ProfileDemo';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(HelloWorldDemo);
registerRootComponent(ProfileDemo);