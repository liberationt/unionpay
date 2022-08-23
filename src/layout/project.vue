<template>
    <section class="customer-layout">
        <header>
            <portalMenu :data="headerMenus" style="background-color: #FFF;" />
            <div class="tagview-content">
                <tagView :menu="headerMenus" />
            </div>
        </header>
        <main>
            <transition name="slide-right" mode="out-in">
            	<keep-alive>
            		<router-view :key="key" />
            	</keep-alive>
            </transition>
        </main>
    </section>
</template>

<script>
    import { commonHeadMenus } from '@/config';
    import { portalMenu, tagView } from '@/components/commons/index.js';
    export default {
    	name: 'empty-layout',
        components: {
            portalMenu, tagView
        },
    	computed: {
    		key() {
    			return this.$route.fullPath + new Date();
    		}
    	},
        data() {
            return {
                headerMenus: commonHeadMenus
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@assets/styles/customer-layout.scss';
</style>
