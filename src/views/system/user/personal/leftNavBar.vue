<template>
  <div class="navbar">
    <ul class="navBarMain">
      <li :class="['navItem',type==i?'actived':'' ]" v-for="(item, i) in navbarList" :key="i" @click="tabChange(item,i)">{{ item.label }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    navbarList: {
      type: Array,
      default: () => {
        return [
          {
            label: "工作台",
            temPath: "workbench",
          },
          {
            label: "个人资料",
            temPath: "information",
          },
          {
            label: "我的收藏",
            temPath: "collection",
          },
          {
            label: "Ta的消息",
            temPath: "news",
          },
          {
            label: "我的待办",
            temPath: "needDeal",
          },
          {
            label: "我的知识",
            temPath: "knowledge",
          },
          {
            label: "我的知识合辑",
            temPath: "knowledgeCollection",
          },
          {
            label: "我的提案",
            temPath: "proposal",
          },
          {
            label: "我的贡献",
            temPath: "contribution",
          },
          {
            label: "我的订阅",
            temPath: "subscribe",
          },
        ];
      },
    },
  },
  data() {
    return {
			type:0
		};
  },
	methods:{
		tabChange(item,type){
			this.type = type
			this.$emit('tabChange',item.temPath)
		}
	}
};
</script>
<style lang="scss" scoped>
.navbar{
	margin-top: 20px;
	box-shadow: 5px 5px 5px 0px rgba(215,215,215,0.35); 
	padding:20px;
  box-sizing: border-box;
  height: 96%;
  background: #fff;
}
.navBarMain{
	display: flex;
	flex-direction: column;
	line-height: 40px;
	font-size: 16px;
	.navItem{
		cursor: pointer;
		text-align: center;
		width:100%;
	}
	.navItem:hover{
		background: #f4f4f4;
	}
	.actived{
		background: #f4f4f4;
	}
}
</style>