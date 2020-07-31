<template>
	<v-overlay z-index="1000" v-model='bool'>
		<v-card light>
			<v-card-text>
				正在{{msg}}。。。
			</v-card-text>
		</v-card>
	</v-overlay>
</template>
<script>
	export default {
		name:'loading',
		data: ()=>({
			bool:false,
			msg: '加载'
		})
	}

</script>
<style lang="less">
	
</style>
