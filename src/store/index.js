import Vue from 'vue'
import Vuex from 'vuex'

import launch from "./modules/launch";
import weather from "./modules/weatherApi";

Vue.use(Vuex)

const createStore = () => {
    return new Vuex.Store({
        modules: {
            module1: launch,
            module2: weather,
        }
    });
};

export default createStore;
