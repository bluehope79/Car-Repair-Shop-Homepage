<template>
  <div class="review">
    <br><br>
    <h1 italic> 후기 게시판 </h1>
    <br><br>
    <div class="board-box">
      <div class="row form-group">
        <div class="col-sm-10"></div>
      </div>
      <div class="row">
        <!-- print meeting log list -->
        <table class="table table-striped">
          <thead>
            <tr class="text-center">
              <th class="text-center">접수번호</th>
              <th class="text-center">내용</th>
              <th class="text-center">작성시간</th>
              <th class="text-center">고객ID</th>
              <th class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index" style="cursor: pointer">
              <td>{{item.접수번호}}</td>
              <td  @click="readBoard(item)" >{{item.내용}}</td>
              <td>{{item.작성시간}}</td>
              <td>{{item.ID}}</td>
              <td><button v-show="user_id == item.ID" type="button" class="btn btn-primary" @click="deleteReview(item)">삭제</button></td>
            </tr>
          </tbody>
        </table>
        <br><br><br>.
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "review",
    data() {
      return {
        msg: '게시판',
        list: []
      }
    },
    computed: {
      isLogged () {
        console.log(this.$store.getters.isLogged)
        return this.$store.getters.isLogged
      },
      user_id () {
        return this.$store.getters.getId
      }
    },
    mounted: function() {
      this.msg = ''
      console.log('후기게시판')
      this.getData()
    },
    methods: {
      getData: function() {
        var url = 'http://106.10.32.228:3000/call/review'
        console.log(url)
        this.$http.get(url)
          .then(result => {
            console.log(result)
            console.log(result.data.status)
            console.log(result.data.result)
            this.list = result.data.result
            console.log(this.list)
            this.list.forEach(v => {
              var datainfo = v.작성시간
              v.작성시간 = this.$moment(dateinfo).tz('Asia/Seoul').format('YYYY년 M월 D일 H시 m분')
            })
          })
          .catch(error => {
            console.log('서버에러')
            console.log(error)
          })
      },
      createLog: function() {
            this.$router.push("Review_add")
      },
      readBoard: function(item){
        console.log('readBoard')
        console.log(item)
          this.$router.push({
            name: 'Review_detail',
            query: {
              id : item.ID,
              num: item.접수번호
            }
          })
        },
        deleteReview: function(item){
          var url = 'http://106.10.32.228:3000/delete/review'
          console.log(url)
          this.$http.get(url+`?ID=${item.접수번호}`)
            .then(result => {
              console.log(result)
              this.getData()
            })
            .catch(error => {
              console.log('서버에러')
              console.log(error)
            })
        }
    }
  }
  </script>



<style media="screen">
.review{
  width: 100%;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align : center;
}
</style>
