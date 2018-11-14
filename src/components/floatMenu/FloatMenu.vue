<template lang="html">
    <div id="moveDiv" ref="moveDiv" class="float-menu-wrapper">
        <div class="menu-list" v-show="showMenu">
            <ul>
              <router-link :to="{path:'/hospitalHome',query: {index: '0'}}" tag="li" @click.native="changeMenuStyle(2)" :class="{on: curIdx== 2}" class="item" >首页</router-link>
              <router-link to="/askDoctor" tag="li" @click.native="changeMenuStyle(3)" :class="{on: curIdx== 3}" class="item" >问诊</router-link>
                <router-link to="/departmentlist" tag="li" @click.native="changeMenuStyle(1)" :class="{on: curIdx== 1}" class="item" >挂号</router-link>
                <!-- <router-link to="/myvipcards" tag="li" @click.native="changeMenuStyle(4)" :class="{on: curIdx== 4}" class="item" >检查报告</router-link> -->
                <router-link :to="{path:'/personalcenter',query: {index: '3'}}" tag="li" @click.native="changeMenuStyle(5)" :class="{on: curIdx== 5}" class="item" >我的</router-link>
            </ul>
        </div>
        <div @click.stop="changeMenu" class="icon-float-menu"
             @touchstart="down"
             @touchmove="move"
             @touchend="end"></div>
    </div>
</template>


<script>
import { Drawer } from 'vux'

export default {
    components: {
        Drawer
    },
    data() {
        return {
            curIdx: -1,
            ifClickedMenu: false,
            showMenu: false,
            flags: false,
            position: {
                x: 0,
                y: 0
            },
            maxMoveX: 0,
            maxMoveY: 0,
            objectW: 85,
            objectH: 83,
            nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: ''
        }
    },
    methods: {
        changeMenuStyle(idx){
            this.curIdx = idx;
            this.showMenu = false;
        },
        changeMenu(){
            this.showMenu = !this.showMenu;
        },
        // 实现移动端拖拽
        down(el){
            this.flags = true;
            this.maxMoveY =  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            this.maxMoveX =  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var touch ;
            if(event.touches){
                touch = event.touches[0];
            }else {
                touch = event;
            }
            this.position.x = touch.clientX;
            this.position.y = touch.clientY;
            this.dx = moveDiv.offsetLeft;
            this.dy = moveDiv.offsetTop;
        },
        move(event){
            if(this.flags){
              var touch ;
              //var moveDiv = document.getElementById('floatMenuWrapper');
              if(event.touches){
                  touch = event.touches[0];
              }else {
                  touch = event;
              }
              this.nx = touch.clientX - this.position.x;
              this.ny = touch.clientY - this.position.y;
              this.xPum = this.dx+this.nx;
              this.yPum = this.dy+this.ny;
              if(this.xPum < 0){
                  this.xPum = 0;
              }
              if(this.xPum >= this.maxMoveX -  this.objectW){
                  this.xPum = this.maxMoveX -  this.objectW;
              }
              if(this.yPum < 200){
                  this.yPum = 200;
              }
              if(this.yPum >= this.maxMoveY -  this.objectH){
                  this.yPum = this.maxMoveY -  this.objectH;
              }
              moveDiv.style.left = this.xPum+"px";
              moveDiv.style.top = this.yPum +"px";
              //阻止页面的滑动默认事件
              document.addEventListener("touchmove",function(){
                  event.preventDefault();
              },{passive: false});
           }
        },
        //鼠标释放时候的函数
        end(){
            this.flags = false;
        }
    }
}
</script>

<style lang="less">
@import '../../common/styles/mixin';
.float-menu-wrapper{
    position: fixed;
    right: 10px;
    bottom: 2.4rem;
    width: 1.66rem;
    height: 1.66rem;
    z-index: 999;
    .icon-float-menu{
        display: block;
        width: 1.66rem;
        height: 1.66rem;
        background: url(icon_float_menu.png) no-repeat center/1.66rem;
    }
    .menu-list{
        position: absolute;
        top: -3.6rem;
        left: 0rem;
        width: 1.68rem;
        height: 3.4rem;
        background: url('../../common/images/bg_float_menu.png') no-repeat top left / 1.68rem 3.4rem;
        ul{
            padding: .04rem;
        }
        .item{
            margin: 0 auto;
            display: block;
            width: 1.2rem;
            height: .74rem;
            line-height: .74rem;
            font-size: .28rem;
            color: #191919;
            text-align: center;
            border-bottom: 1px solid #e5e5e5;
            &.on{
                width: 100%;
                background-color: #92ebda;
                color: #fff;
            }
            &:last-child{
                border-bottom: none;
            }
        }
    }
}
</style>
