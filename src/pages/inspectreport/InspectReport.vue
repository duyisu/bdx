<template lang="html">
	<div id="inspectReport">
		<p class="iRnotice">结果仅供医生参考，如有疑问请及时前往医院核对、复诊</p>
		<div class="inspectInfo">
			<p>
				<span>检测医生：</span>
				<span>{{ list[0].check_doctor }}</span>
			</p>
			<p>
				<span>检测登记号：</span>
				<span>{{ list[0].reg_no }}</span>
			</p>
			<p>
				<span>报告时间：</span>
				<span>{{ list[0].check_time }}</span>
			</p>
		</div>

		<div class="inspectList">
			<h4 class="inspectTile">
				<span class="titleName">检验指标</span>
				<span class="middleLine"></span>
			</h4>
			<div class="inspectResult">
				<table>
					<thead>
						<tr>
							<th>检测指标</th>
							<th>结果</th>
							<th>参考值</th>
						</tr>
					</thead>
					<tbody>
						<tr
						:key = "index"
						v-for="item,index in list">
							<td>{{ item.name }}</td>
							<td>{{ item.check_result }}</td>
							<td>{{ item.range }}</td>
						</tr>
						<!-- <tr>
							<td>红细胞(RBC)</td>
							<td>0.00个/ul</td>
							<td>0 - 35</td>
						</tr> -->
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { getStore,setStore } from '@common/js/mUtils';
export default {
    data(){
    	return {
    		list:[]
    	}
    },
    created(){
    	this.list = JSON.parse(getStore('checkReport')) || [];
    	
    }
}
</script>

<style lang="less">

#inspectReport .iRnotice{
	width:100%;
	height:.86rem;
	line-height:.86rem;
	border-top:1px solid transparent;
	background:#fffac8;
	box-sizing: border-box;
	text-align:center;
  	font-size: .26rem;
  	color: #ffb642;
}
#inspectReport .inspectInfo{
	background:#fff;
	padding:0 .3rem;
}
#inspectReport .inspectInfo p{
	padding:.3rem 0;
	border-bottom:.02rem solid #f5f5f5;
}
#inspectReport .inspectInfo p:last-child{
	border-bottom:none;
}
#inspectReport .inspectInfo p span{
	font-size: .26rem;
  	font-weight: 500;
}
#inspectReport .inspectInfo p span:nth-of-type(1){
  	color: #898989;
}
#inspectReport .inspectInfo p span:nth-of-type(2){
  	color: #bbbbbb;
}

#inspectReport .inspectList{
	margin-top:.2rem;
	background:#fff;
}

#inspectReport .inspectTile{
	border-top:1px solid transparent;
	position:relative;
	height:1.06rem;
	text-align: center;
	line-height:1.06rem;
	box-sizing: border-box;
}
#inspectReport .inspectTile .titleName{
  	font-size: .285rem;
  	color: #66e4cc;
  	font-weight: 500;
  	position:relative;
  	z-index:2;
  	background:#fff;
  	padding:0 .2rem;
}
#inspectReport .inspectTile .middleLine{
	z-index:1;
	position:absolute;
	width:2.19rem;
	height:.03rem;
	background:#66e4cc;
	left:50%;
	top:50%;
	transform:translate(-50%,-50%);
}

#inspectReport .inspectResult{
	width:6.6rem;
	margin:0 auto;
	padding-bottom:.3rem;
}
#inspectReport .inspectResult th{
	text-align: center;
    border: 1px solid #fff;
    font-weight: 500;
    color:#191919;
}
#inspectReport .inspectResult td{
	text-align: center;
    border: 1px solid #f5f5f5;
  	font-size: .26rem;
  	color: #898989;
  	font-weight: 400;
  	vertical-align: middle;
}

#inspectReport .inspectResult thead{
	background:#f5f5f5;
}
#inspectReport .inspectResult thead tr th{
	width:33.33%;
	padding:.3rem 0;
}
#inspectReport .inspectResult tbody tr td{
	width:33.33%;
	padding:.3rem 0;
}

</style>
