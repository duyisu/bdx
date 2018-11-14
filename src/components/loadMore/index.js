import LoadMore from '@components/loadMore/LoadMore'
let loadMore = {
    data() {
            return {
                page: 1,
                rows: 10,
                totalPage: 1,
                ifLoadMore: false
            }
        },
        methods: {
            onRefresh(done) {
                    this.initData(done);
                },
                onInfinite(done) {
                    this.page++;
                    this.initData(done);
                }
        },
        components: {
            LoadMore
        }
}

export default loadMore
