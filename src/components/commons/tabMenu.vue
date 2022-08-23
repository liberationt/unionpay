<template>
    <div class="tab-menu-list">
        <ul>
            <li
                v-for="(item, idx) in data"
                :key="idx"
                :class="{'active':activeName===item.value}"
                @click.stop.prevent="handleClick(item)">
                <i v-if="item.icon" :class="item.icon" />
                <span style="setStyle">{{item.label}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'tab-menu',
        props: {
            data: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            size: {
                type: String,
                default: () => {
                    return 'mini'
                }
            }
        },
        computed: {
            setStyle() {
                let fontSize = '14px';
                switch(size) {
                    case 'mini':
                        fontSize = '12px';
                        break;
                    case 'medium':
                        fontSize = '16px';
                        break;
                    case 'large':
                        fontSize = '18px';
                        break;
                }
                return {
                    'font-size': fontSize
                }
            }
        },
        data() {
            return {
                activeName: ""
            }
        },
        methods: {
            handleClick(item={}){
                this.activeName = item.value;
                this.$emit('change', item);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tab-menu-list{
        >ul{
            list-style-type: none;
            margin: 0;
            padding: 0;
            >li{
                float: left;
                margin: 0 10px;
                cursor: pointer;
                border-bottom: 2px solid transparent;
                &:first-child{
                    margin: 0;
                }
                &.active{
                    border-color: #409EFF;
                }
                >i{
                    font-size: 14px;
                    margin-right: 5px;
                }
            }
        }
    }
</style>
