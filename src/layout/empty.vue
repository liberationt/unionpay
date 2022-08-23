<template>
    <section class="customer-layout">
        <header>
            <portalMenu :data="headerMenus" style="background-color: #FFF;" />
            <div class="tagview-content" v-if="checkRoute">
                <tagView :menu="headerMenus" portal />
            </div>
        </header>
        <main :class="{'portal': ['/'].includes($route.path)}">
            <transition name="slide-right" mode="out-in">
            	<keep-alive>
            		<router-view :key="key" />
            	</keep-alive>
            </transition>
        </main>
        <!-- <footer>
            <commonFooter />
        </footer> -->
    </section>
</template>

<script>
    import { portalMenu, commonFooter, tagView } from '@/components/commons/index.js';
    import { defaultHeadMenus } from "@/config";
    export default {
    	name: 'empty-layout',
        components: {
            portalMenu, commonFooter, tagView
        },
    	computed: {
    		key() {
    			return this.$route.fullPath + new Date();
    		},
            checkRoute() {
                return !['/'].includes(this.$route.path);
            }
    	},
        data() {
            return {
                headerMenus: defaultHeadMenus
            }
        }
    }
</script>


<style lang="scss" scoped>
    @import '~@assets/styles/customer-layout.scss';
</style>
