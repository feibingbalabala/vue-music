<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
  import musicList from '../music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from '../../api/recommend'
  import {ERR_OK} from '../../api/config'
  import {createSong} from '../../common/js/song'

  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.disc.dissneme
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          let ret = res
          if (typeof ret === 'string') {
            ret = ret.substr(13, ret.length - 1)
            ret = ret.substr(0, ret.length - 1)
            ret = JSON.parse(ret)
          }
          if (ret.code === ERR_OK) {
            this.songs = this._normalizeSongs(ret.cdlist[0].songlist)
            console.log(ret.cdlist[0].songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      musicList
    }
  }
</script>
<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-action
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
