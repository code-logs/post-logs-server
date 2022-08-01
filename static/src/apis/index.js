import fetcher from '../utils/fetcher.js';
export const apis = {
    async getPosts() {
        return fetcher.get('/posts');
    },
    async getPost(name) {
        return fetcher.get(`/posts/${name}`);
    },
    async createPost(tempPost, content, thumbnail) {
        const formData = new FormData();
        formData.append('tempPost', JSON.stringify(tempPost));
        formData.append('content', content);
        formData.append('thumbnail', thumbnail);
        return fetcher.post('/posts', formData, {
            'content-type': 'multipart/form-data',
        });
    },
    async updatePost(postId, tempPost, content, thumbnail) {
        const formData = new FormData();
        formData.append('tempPost', JSON.stringify(tempPost));
        formData.append('content', content);
        if (thumbnail)
            formData.append('thumbnail', thumbnail);
        return fetcher.put(`/posts/${postId}`, formData, {
            'content-type': 'multipart/form-data',
        });
    },
    async deletePost(postFilename) {
        await fetcher.delete(`/posts/${postFilename.replace(/\.md$/, '')}`);
    },
    async deployPosts() {
        return fetcher.post('/deploy');
    },
    async getCategories() {
        return fetcher.get('/categories');
    },
    async getTags() {
        return fetcher.get('/tags');
    },
    async getLastSyncDatetime() {
        return fetcher.get('/configurations/last-sync-datetime');
    },
    async syncRepository() {
        return fetcher.post('/configurations/sync-repository');
    },
    async getModifiedPosts() {
        return fetcher.get('/modified-posts');
    },
    async getTemplate() {
        return fetcher.get('/configurations/template');
    },
    async saveTemplate(content) {
        return fetcher.post('/configurations/save-template', { content });
    },
};
//# sourceMappingURL=index.js.map