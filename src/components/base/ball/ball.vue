<template>
<div class="ball_box">
	<div class="wave"></div>
	<div class="top">
	    <h5>已用流量</h5>
	    <p>1000 <span>KB</span></p>                
	</div>
	<div class="bottom">
	    <p>套餐总量: <span>100</span>M</p>
	</div>
</div>
</template>
<style scoped lang="less">
@import url('../../../common/less/index.less');

.ball_box{
    width: 200px;
    height: 200px;
    margin: 0px auto;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    .top{
        width: 150px;
        text-align: center;
        color: #3daafc;
        position: absolute;
        z-index: 10;
        top: 30px;
        left: 50%;
        transform: translateX(-50%;);
        font-size: 18px;
        h5{
            font-weight: 400;
            color: #999;
        }
        p{
            margin-top: 0px;
            font-size: 30px;
            font-weight: 600;
        }
        span{
            font-size: 14px;
            font-weight: 400;
        }
    }
    .bottom{
        color: #fff;
        width: 150px;
        text-align: center;
        position: absolute;
        z-index: 10;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        p{
            font-size: 16px;
        }
        span{
          
        }
    }
}
.wave{
    width: 200px;
    height: 200px;
    background-color: #3daafc;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    transform: translate3d(0,0,0);
    &::before,&::after{
    	content: "";
    	width: 400px;
    	height: 400px;
    	position: absolute;
    	top: -100%;
    	left: -50%;
    }
    &::before{
    	background-color: rgba(255,255,255,0.7);
    	border-radius: 40%;
    	//这两个伪类的外边框圆角都是经过推敲的，以达到视觉上完美的效果
    	animation:10s rotate_before linear infinite;
    }
    &::after{
    	// background-color: rgba(255,255,255,.1);
    	background-color: #fff;
    	border-radius: 46%;
    	animation:10s rotate_after linear infinite;
    }
}
@keyframes rotate_before{
    from{
        transform: translate(0%,-24%) rotate(0deg);
    }
    to{
        transform:translate(0%,-24%) rotate(360deg);
    }
}
@keyframes rotate_after{
    from{
        transform: translate(0%,-24%) rotate(0deg);
    }
    to{
        transform:translate(0%,-24%) rotate(30deg);
        //这两个的旋转角度也是经过事先过很多次，和上面的圆角配合，才有了很好的视觉效果
    }
}
</style>