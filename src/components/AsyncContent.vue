<template>
    <div class="async-content">
        <slot name="loading" v-if="isLoading">未传递，显示默认加载中效果</slot>
        <slot name="error" v-else-if="error" :error="error">未传递，显示默认错误提示</slot>
        <slot v-else :datas="datas">未传递，显示默认内容</slot>
    </div>
</template>
<script>
export default {
    name: 'AsyncContent',
    props: {
        contentPromise: Promise
    },
    data(){
        return {
            isLoading: true,
            error: null,
            datas: null
        };
    },
    async created(){
        try {
            // 获取数据
            this.datas = await this.contentPromise;
        } catch(e) {
            // 错误处理
            this.error = e;
        } finally {
            // 只要是加载完，不管是成功还是失败
            this.isLoading = false;
        }
    },
    mounted(){
        console.log(this);
    }
}
</script>