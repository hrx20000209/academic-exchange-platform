<template>
    <div class="myheader">
        <el-row style="margin-top: 10px">
            <el-col :span=2>
                <div style="color: #ff751a">网站名字</div>
            </el-col>
            <el-col :span=2 :offset=18>
                <el-button class="login">登录</el-button>
            </el-col>
            <el-col :span=2 :offset=0>
                <el-button class="register">注册</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<style>
.myheader{
    background-color: #fff;
    min-height: 100px;
}
.login{
    color: black;
    background-color: #fff;
    border-radius: 0;
    border: 2px solid #007398;
    font-family: inherit;
    padding: 0 16px;
    height: 40px;
    min-width: 80px
}
.login:hover{
    background-color:#ff751a;
    color: #fff;
    border: 0
}
.register{
    color: #fff;
    background-color: #007398;
    border-radius: 0;
    border: 2px solid #007398;
    font-family: inherit;
    padding: 0 16px;
    height: 40px;
    min-width: 80px;
    margin-left: 0px
}
.register:hover{
    background-color:#ff751a;
    color: #fff;
    border: 0
}
</style>
