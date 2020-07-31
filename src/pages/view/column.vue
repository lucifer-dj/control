<template>
 <v-container ref="container">
   <v-card class="px-6" elevation="1">
    <v-toolbar flat>
      <v-card-title>栏目管理</v-card-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-4" @click="dialog=true;">+添加栏目</v-btn>
      <v-btn>更新排序</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="items"  disable-sort  @click:row="cTableRow($event)">
      <!-- 名称 -->
      <template v-slot:item.name={item}>
        <span>{{item.name}}</span>
      </template>
      <!-- 是否显示 -->
      <template v-slot:item.show={item}>
        <span>{{item.show?'显示':'隐藏'}}</span>
      </template>
      
      <!-- 操作 -->
      <template v-slot:item.oper={item}>
        <v-btn fab x-small depressed title="添加子项目" class="mx-1" @click="addSonCol(item)">
          <v-icon>iconfont-ic_add_line</v-icon>
        </v-btn>
        <v-btn fab x-small depressed title="删除" class="mx-1"  @click="deleteCol(item.id)">
          <v-icon>iconfont iconfont-customerarchivesrecycleBin</v-icon>
        </v-btn>
        <v-btn fab x-small depressed title="修改" class="mx-1" @click="editCol(item)">
          <v-icon>iconfont iconfont-basepermissionapproveApply</v-icon>
        </v-btn>
      </template>
      <!-- <template v-slot:item>
        
      </template> -->
    </v-data-table>  
   </v-card>

  <!-- 添加栏目 -->
  <v-dialog v-model="dialog" fullscreen persistent hide-overlay>
   <v-card class="d-flex align-center flex-column">
      <v-card-title class="justify-center text-h4">添加栏目</v-card-title>
      <v-col md="6">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field 
              label="*栏目名称"
              v-model="columnModel.name"
              required
              @input="$v.columnModel.name.$touch()"
              @blur="$v.columnModel.name.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" >
              <v-select label="所属栏目" 
              :items="origin"
              v-model="columnModel.origin"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" >
              <v-select 
              v-model="columnModel.template"
              label="*选择模板"
              :items="template"
              item-text="name"
              item-value="val"
              required
              @input="$v.columnModel.template.$touch()"
              @blur="$v.columnModel.name.$touch()"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-row align-center">
              <span>是否隐藏</span>
              <v-radio-group 
              row 
              class="ml-10"
              v-model="columnModel.show"
              >
                <v-radio label="显示" value="true" off-icon="iconfont-weixuan" on-icon="iconfont-xuanzhong"></v-radio>
                <v-radio label="隐藏" value="false" off-icon="iconfont-weixuan" on-icon="iconfont-xuanzhong"></v-radio>
              </v-radio-group>
            </v-col>
            <!-- <v-col cols="12" md="6">
              <v-text-field label="栏目英文名称"></v-text-field>
            </v-col> -->
            <v-col cols="12" md="6">
              <v-text-field 
              label="排序"
              v-model="columnModel.sort"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field 
              label="关键词" 
              v-model="columnModel.keywords"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-file-input 
              prepend-icon="mdi-camera"
              v-model="columnModel.columnpic" 
              accept="image/*" 
              label="栏目图片"
              ></v-file-input>
            </v-col>
            <v-col cols="12" md="12">
              <v-textarea 
              label="栏目描述" solo auto-grow
              v-model="columnModel.description"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
      </v-col>
      <v-card-actions>
        <v-btn width="100" class="mx-3" @click="submit">提交</v-btn>
        <v-btn width="100" class="mx-3" @click="dialog=false;columnModelReset();">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

 </v-container>
</template>
<script>
import * as api from '@api';
import { required } from 'vuelidate/lib/validators'
export default {
  name: "column",
  validations:{
    columnModel:{
      name:{
        required
      },
      template:{
        required
      }
    }
  },
  data: () => ({
    headers: [
      { text: "ID", value: "id", align: "center"},
      { text: "名称", value: "name", align: "center", },
      { text: "显示", value: "show", align: "center", },
      { text: "排序", value: "order", align: "center",},
      { text: "操作", value: "oper", align: "center",}
    ],
    items: [
      {
        id: "1",
        name: "角色管理",
        show:true,
        order:'0',
        oper:''
      },
      {
        id: "2",
        name: "势力划分",
        show:false,
        order:'0',
        oper:''
      },
      {
        id: "3",
        name: "内容介绍",
        show:true,
        order:'0',
        oper:''
      }
    ],
    dialog: false,
    origin:['顶级栏目','新闻中心','关于我们','角色介绍'],
    template: [
      {name:'新闻模板',val:'news'},
      {name:'单页模板',val:'page'},
      {name:'角色模板',val:'role'},
      {name:'关于模板',val:'about'},
      {name:'地势模板',val:'place'}
    ],
    columnModel:{
      origin:'顶级栏目',
      name:'新闻中心',
      show:true,
      description:'',
      keywords:'',
      columnpic:[],
      sort:'',
      template:''
    }
  }),
  mounted(){
    // console.log(this.pageIndex)
    // let that = this;
  },
  methods:{
    columnModelReset(){

    },
    cTableRow(e){
      //点击表格某一行
      console.log(e)
    },
    async submit(){
      let that = this;
      that.$v.columnModel.$touch();
      // if(that.$v.columnModel.$invalid){
      //   return console.log('请填写必填项')
      // }
      try{
        let pic = await that.uploadPic(that.columnModel.columnpic)
        if(pic){
          that.columnModel.pic = pic
          delete that.columnModel.columnpic
          let result = await api.addColumn(that.columnModel,that)
          console.log(result)
        }
      }catch(e){

      }
    },
    async uploadPic(file){

      let that = this;
      try{
        let fm = new FormData();
        fm.append('file',file)
        let result = await api.upload(fm,that)
        if(result.data.code==200){
          return result.data.path
        }else{
          return false
        }
      }catch(e){
        console.log(e)
        return false
      }
    }
  },
  computed:{
    nameErrors(){
      const errors = [];
      if (!this.$v.userModel.name.$dirty) return errors;
      !this.$v.userModel.name.required && errors.push('必填');
      return errors;
    },
    templateErrors(){
      const errors = [];
      if (!this.$v.userModel.template.$dirty) return errors;
      !this.$v.userModel.template.required && errors.push('必填');
      return errors;
    }
  }
};
</script>
<style lang="less">
tbody>tr{
  cursor:pointer;
}
</style>

