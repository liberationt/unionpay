<template>
	<div class="app-container">
		<component :is="cmp" :data="flowData" @change="updateEvent" />
	</div>
</template>

<script>
    import * as flowCmp from './cmp.js';
    import { flowEngIntData, emptyData } from '@/config';
    import { storeData } from '@/utils/index.js';
	export default {
		name: 'page-list',
        computed: {
            cmp() {
                return flowCmp[this.cmpName];
            }
        },
		data() {
			return {
				cmpName: 'flowList',
                flowData: null,
			}
		},
		methods: {
			updateEvent(obj={}) {
                console.log('updateEvent', obj.data)
                switch(obj.act) {
                    case 'flowEdit':
                        this.flowData = _.merge(obj.data||{}, emptyData, flowEngIntData);
                        break;
                    case 'flowList':
                        break;
                }
                this.cmpName = obj.act;
            }
		}
	}
</script>

<style lang="scss" scoped>
    .app-container{
        height: 100%;
        padding: 0;
    }
</style>
