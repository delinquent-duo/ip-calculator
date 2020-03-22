import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import color from 'vuetify/lib/util/colors';

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: color.blueGrey.darken3,
        secondary: color.blueGrey.lighten3,
        accent: color.pink.lighten2
      }
    }
  }
});

Vue.use(Vuetify);

export default vuetify;
