<template lang="html">
	<div id="reservation">
		<h4>北斗星耳鼻喉医院会员条款</h4>
		<div class="line"></div>
		<p>
			<i>1.北斗星会员中心</i>
			<em>1.1 北斗星会员中心是北斗星耳鼻喉医院为客户度身打造的专属会员服务机构。</em>
			<em>1.2 会员自愿加入北斗星会员中心，应仔细阅读本服务协议。</em>
		</p>
		<p>
			<i>2.会员权利</i>
			<em>2.1 会员选择成为的北斗星会员类型为勾选</em>
			<img @click.prevent="" src='../../common/images/personalcenter/clauseTable.png' style="width:6.6rem;margin:0.1rem 0;">
			<em>2.2 充值金额即为会员卡内金额，会员可持卡，在北斗星耳鼻喉医院仅限门诊使用；</em>
			<em>2.3 礼赠仅限首充赠送，后续充值金额可根据您的需要自主决定，后续充值将不享受额外礼赠；</em>
			<em>2.4 个人会员升级成家庭会员，可补缴差额办理。补缴后个人会员权益即时结算并终止，家庭会员权益生效。</em>
			<em>2.5 因享受会员优惠，会员充值金额请恕无法办理退费事宜，且有效期限为两年；自办卡之日起，两年后卡内余额将自动失效。</em>
			<em>2.6 家庭卡三位受益人一旦绑定完成，不支持更换受益人；二胎或双胞胎家庭，可支持绑定四位受益人；</em>
			<em>2.7 会员凭卡识别会员资格和权益，就诊时需携带，若未带会员卡，仅限享受会员权益,不可消费卡内余额;</em>
			<em>2.8 为方便您的就诊，会员中心提供卡片寄存服务，您可以在医院一楼前台办理；</em>
			<em>2.9 为保护您的财产安全，请保管好您的卡片或选择卡片寄存服务，卡片若遗失请尽快办理挂失；办理补卡需缴纳50元制卡费。</em>
		</p>
		<p>
			<i>3.会员义务</i>
			<em>3.1 会员应遵守国家社会的各项法律法规，遵守会员中心的规章制度。</em>
			<em>3.2 会员应提供真实、准确、完整的个人资料，以便进行资料更新，确保能正常享受会员权益。如资料不真实准确，将无法享受会员权益。</em>
			<em>3.3 会员卡内包含个人隐私信息，不可转借。</em>
			<em>3.4 会员自愿参加会员中心组织的活动，须遵守活动安排和组织纪律。</em>
			<em>3.5 会员不得利用本会员中心提供的设施、优惠服务、资料或文件做任何商业用途，不能损害会员中心的社会声誉。</em>
		</p>
		<p>
			<i>4.附则</i>
			<em>4.1 成为会员后，会员中心将通过官方发布的正规渠道（不限于短信、微信、电话、邮箱等）向会员提供各项优惠和服务，如遇特别活动安排，会员须事先取得会员中心邀请或认可。</em>
			<em>4.2 会员同意本协议视为已了解且同意遵守本协议。</em>
			<em>4.3 夜诊是预约制，如有需求请在当日17：00前预约，夜诊看诊时间为：18：00-21:00;周六、周日不开设夜诊。</em>
			<em>4.4 因急诊需要内科、外科等多科室协同配合，北斗星作为专科医院难以全面覆盖所有学科，如有急诊需求请至综合医院就诊，以免影响病情。</em>
		</p>
		<p>
			北斗星耳鼻喉医院对本协议享有最终解释权。
		</p>
	</div>
</template>

<script>

export default {
    data(){
    	return {

    	}
    },
    methods:{
    	
    }
}
</script>

<style lang="less" scoped>

body{
	background:#fff;
}
#reservation{
	padding-bottom:.5rem;
}
#reservation h4{
  	font-size: .32rem;
  	font-weight: bold;
  	letter-spacing: 0.006rem;
  	color: #191919;
  	text-align: center;
  	padding:.5rem 0;
}
#reservation .line{
	width: 5.18rem;
  	height: .02rem;
  	background-color: #f5f5f5;
  	margin:0 auto;
}
#reservation p:nth-of-type(1){
	margin-top:.2rem;
}
#reservation p{
	margin-top:.6rem;
	padding:0 .5rem;
  font-weight: normal;
  color: #191919;
   font-size: .32rem;
}
#reservation p span{
	color:#66e4cc;
}
#reservation p i{
	display:block;
	line-height:.6rem;
}
#reservation p em{
	display:block;
	text-indent: 1em;
	line-height:.6rem;
}

</style>
