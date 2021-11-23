<template>
    <div id="app">
        <div class="btn">
            <button
                type="button"
                data-direction="next"
                @click="throttleChangeImageIndex($event)"
            >
                next
            </button>
            <button
                type="button"
                data-direction="prev"
                @click="throttleChangeImageIndex($event)"
            >
                prev
            </button>
        </div>
        <transition :name="direction">
            <img :src="imageSrc" alt="" :key="uniqueId()" />
        </transition>
    </div>
</template>
<script>
import throttle from "@/utils/throttle";
export default {
    name: "App",
    data() {
        return {
            images: [
                "https://10.idqqimg.com/eth/ajNVdqHZLLAJib8odhz8Th2Z4Gat0axooYaxANJlaLEwTomre0hx8Y5yib6FxDZxsgiaYG1W2ETbrU/130?tp=webp",
                "https://10.idqqimg.com/eth/ajNVdqHZLLDqYf0PtFibF9JNOnRbAw7DicWPicmfRkQwPeK2mnZ7ZJzZFdsCwCWdcwhEqoVphXiaDHE/130?tp=webp",
                "https://thirdqq.qlogo.cn/g?b=sdk&k=LaERpMuX1ZjWTQmhrhst6Q&s=100&t=0&tp=webp",
                "https://10.idqqimg.com/eth/ajNVdqHZLLDXIjdTYsqbfkxiaibd3lYGEgfiaEwficYfK2ogZDicCxaKibVibGA2Cj2ltgOvCm1tbRs1iac/130?tp=webp",
                "https://thirdqq.qlogo.cn/g?b=sdk&k=pfIficic6WRliaLULZudVI5Tw&s=640&t=1600139160&tp=webp",
            ],
            currentIndex: 0, // 控制轮播图索引
            direction: "", // 控制轮播图移动方向
        };
    },
    computed: {
        imageSrc() {
            return this.images[this.currentIndex];
        },
        imageMaxIndex() {
            return this.images.length - 1;
        },
        throttleChangeImageIndex() {
            return throttle(this.changeImageIndex, 500);
        },
    },
    methods: {
        uniqueId() {
            return Math.random().toString(16).substr(2, 6);
        },
        prevImage() {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.imageMaxIndex;
            }
        },
        nextImage() {
            this.currentIndex++;
            if (this.currentIndex > this.imageMaxIndex) {
                this.currentIndex = 0;
            }
        },
        changeImageIndex(event) {
            this.direction = event.target.dataset.direction;
            if (this.direction === "prev") {
                this.prevImage();
            } else {
                this.nextImage();
            }
        },
    },
};
</script>
<style lang="less" scoped>
#app {
    position: relative;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    button {
        margin: 0 10px;
    }
    img {
        position: absolute;
        left: 50%;
        margin-left: -50px;
        width: 100px;
        height: 100px;
        object-fit: cover;
        vertical-align: top;
        margin-top: 20px;
        border-radius: 50%;
    }
    .next-enter,
    .prev-leave-to {
        opacity: 0;
        transform: translateX(100%);
    }
    .next-enter-active,
    .next-leave-active,
    .prev-enter-active,
    .prev-leave-active {
        transition: 0.5s;
    }
    .next-leave-to,
    .prev-enter {
        opacity: 0;
        transform: translateX(-100%);
    }
}
</style>
