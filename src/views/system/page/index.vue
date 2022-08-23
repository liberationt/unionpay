<template>
	<div class="app-container">
		<component :is="cmp" @change="updateEvent" />
	</div>
</template>

<script>
    import * as pageCmp from './cmp.js';
    import { storeData } from '@/utils/index.js';
	export default {
		name: 'page-list',
        computed: {
            cmp() {
                return pageCmp[this.cmpName];
            }
        },
		data() {
			return {
				cmpName: 'pageList',
                currItem: null,
			}
		},
		methods: {
			updateEvent(obj={}) {
                console.log('updateEvent', obj.data)
                switch(obj.act) {
                    case 'pageEdit':
                        storeData.remove("pageData", true);
                        if (obj.data) {
                            var pageData = JSON.parse(obj.data.content);
                            storeData.set("pageData", pageData, true);
                        }

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
