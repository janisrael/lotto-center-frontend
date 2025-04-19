import ResultService from "@/services/result.service"

const initialState = { ResultService: null };
/* eslint-disable */
export const result = {
    namespaced: true,
    state: initialState,
    actions: {
        async getResults({ commit }) {
            const lottoResult = await ResultService.getResults();

            commit('success', lottoResult.results);
            return lottoResult
        },

        async editProfile({ commit }, modifiedProfile) {
            const userProfile = await ResultService.editProfile(modifiedProfile);
            commit('success', userProfile);
        },

        //eslint-disable-next-line no-unused-vars
        async uploadPic({ commit }, file) {
           const picURL = (await ResultService.uploadPic(file, this.state.profile.userProfile.id)).url;
           commit('successUpload', picURL);
        },

        

    },
    mutations: {
        success(state, lottoResult) {
   
            state.ResultService = lottoResult;
        
        },
        successUpload(state, picURL){
            state.userProfile.profile_image = picURL;
        }
    },
    getters: {
        getLottoResult(state){
            return state.ResultService
        },
        getUserProfileImage(state){
            return state.userProfile.profile_image
        }
    }
}