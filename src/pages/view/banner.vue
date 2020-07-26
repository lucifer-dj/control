<template>
  <v-container>
    <v-subheader>
        页面设置
      <v-icon class="iconfont iconxiangyou mx-1" small ></v-icon>
        首页轮播
    </v-subheader>
    <v-card class="px-6">
      <v-toolbar flat>
        <v-btn text @click="dialog=true;">+添加</v-btn>
        <v-btn text>更新</v-btn>
      </v-toolbar>
      <v-data-table align="center" :headers="headers" disable-sort 
      :items="items"
      >
        <template v-slot:item.oper={item}>
          <v-btn fab x-small depressed title="删除" class="mx-1"  @click="deleteCol(item.id)">
            <v-icon>iconfont iconfont-customerarchivesrecycleBin</v-icon>
          </v-btn>
          <v-btn fab x-small depressed title="修改" class="mx-1" @click="editCol(item)">
            <v-icon>iconfont iconfont-basepermissionapproveApply</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent class="v-dialog">
        <v-row justify="center">
          <v-col cols="6" class="pa-0 ma-0">
            <v-card class="pa-5">
              <v-card-title class="justify-center text-uppercase text-h5">添加banner</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <v-text-field label="标题"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="跳转网址"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="排序"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-file-input label="上传图片"></v-file-input>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions class="justify-center">
                <v-btn width="120" class="mx-2">提交</v-btn>
                <v-btn width="120" class="mx-2" @click="dialog=false;">关闭</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name:'banner',
  data:()=>({
    headers:[
      {text:'ID',value:'id'},
      {text:'名称',value:'name'},
      {text:'排序',value:'order'},
      {text:'发布时间',value:'date'},
      {text:'操作',value:'oper'},
    ],
  items: [
    {id:0,name:'banner',order:'3',date:'2020-07-23',oper:''},
    {id:1,name:'banner',order:'3',date:'2020-07-23',oper:''}
  ],
  dialog: false,
  })
}
</script>
<style lang="less">
  .v-dialog{
    box-shadow: none !important;
  }
</style>