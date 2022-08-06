import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isPostsLoading: false,
        selectedSort: '',
        page: 1,
        limit: 10,
        totalPages: 0,
        searchQuery: '',
        sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'},
        ],
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            });
        },
        sortedAndSearchedPosts(state, getters) {
            if (!state.searchQuery) {
                return getters.sortedPosts;
            }
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        createPost(state, post) {
            state.posts.push(post);
        },
        removePost(state, post) {
            state.posts = state.posts.filter(p => p.id !== post.id);
        },
        setPostLoadingState(state, isPostsLoading) {
            state.isPostsLoading = isPostsLoading;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setPage(state, page) {
            state.page = page;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setPostLoadingState', true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                const totalPages = Math.ceil(response.headers['x-total-count'] / state.limit);
                commit('setTotalPages', totalPages);

                commit('setPosts', response.data);
            } catch (e) {
                alert('Ошибка');
            } finally {
                commit('setPostLoadingState', false);
            }
        },

        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page + 1);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                const totalPages = Math.ceil(response.headers['x-total-count'] / state.limit);
                commit('setTotalPages', totalPages);

                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e) {
                alert('Ошибка');
            }
        },
    },
    namespaced: true
}
