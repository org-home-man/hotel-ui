<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #484a4d;
        /*background: #b6bbbb21;*/
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        height: 100%;
    }.el-table .warning-row {
         background: #dbf6fa;
     }

    .el-table .success-row {
        background: #dbf6fa;
    }
</style>
