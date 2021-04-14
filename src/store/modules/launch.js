
import cities from '../../plugins/cities.json'

export default{
    state: {
        isMobile: null,
        unit: (localStorage.getItem("unit"))? localStorage.getItem("unit") : 'C',
        cities: cities,
    },
    mutations: {
        INIT_DEVICE: (state, value) => {
            if (value === null){
                state.isMobile = {
                    Android: function() {
                        return navigator.userAgent.match(/Android/i);
                    },
                    BlackBerry: function() {
                        return navigator.userAgent.match(/BlackBerry/i);
                    },
                    iOS: function() {
                        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                    },
                    Opera: function() {
                        return navigator.userAgent.match(/Opera Mini/i);
                    },
                    Windows: function() {
                        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
                    },
                    any: function() {
                        return (state.isMobile.Android() || state.isMobile.BlackBerry() || state.isMobile.iOS() || state.isMobile.Opera() || state.isMobile.Windows());
                    }
                };
            }

        },
        SET_UNIT: (state, value) => {
            state.unit = value;
            localStorage.setItem("unit", value)
        },
    },
    actions: {
        initDevice: (state, value) => {
            state.commit('INIT_DEVICE', value);
        },
        setUnit: (state, value) => {
            state.commit('SET_UNIT', value);
            let url = state.rootState.module2.url;
            if (value === 'F')
                url = url.replace('units=metric', 'units=imperial')
            else
                url = url.replace('units=imperial', 'units=metric')
            state.dispatch('getRequest', url);
        },
    },
    getters:{
        isMobile: state => {
            return state.isMobile.any() !== null;
        },
        getUnit: state => {
            return state.unit;
        },
        getCities: state => {
            return state.cities
        }
    },
    modules: {
    }
}
