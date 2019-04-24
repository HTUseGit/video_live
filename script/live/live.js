/*
              ┏┓      ┏┓
            ┏┛┻━━━┛┻┓
            ┃       ☃      ┃
            ┃  ┳┛  ┗┳  ┃
            ┃      ┻      ┃
            ┗━┓     ┏-━┛
                ┃     ┗━━┓
                ┃  神兽保佑 ┣┓
                ┃　永无BUG！┏┛
                ┗┓┓┏━-┳┓┏┛
                  ┃┫┫   ┃┫┫
                  ┗┻┛   ┗┻┛
 
 */
'use strict';
$(function ($) {
    let myPlayer = videojs('my-video', {
        bigPlayButton: false,
        controlBar: {
            playToggle: true,
            volumePanel: false,
            currentTimeDisplay: false,
            timeDivider: false,
            durationDisplay: false,
            progressControl: false,
            liveDisplay: false,
            remainingTimeDisplay: false,
            customControlSpacer: false,
            playbackRateMenuButton: false,
            chaptersButton: false,
            descriptionsButton: false,
            subsCapsButton: false,
            audioTrackButton: false,
            fullscreenToggle: true
        },
        sources: [{
            src: "rtmp://182.140.132.172/live/ht",
            type: "rtmp/flv"
        }]
    });
    //rtmp://cyberplayerplay.kaywang.cn/cyberplayer/demo201711-L1
    //rtmp://182.140.132.172/live/ht
    videojs("my-video").ready(function () {
        let myPlayer = this;
        myPlayer.play();
        myPlayer.on('play', function () {
            console.log('play',myPlayer.currentSrc())
        });
        myPlayer.on('error', function (e) {
            console.log(e)
        })
    });

    $(".vjs-control-bar").append('<div class="live_volume f_left"><div class="live_volume_box f_left"><img src="images/live/voice_2.png" alt=""></div><div class="drag f_left"><div class="bgDragGroove"></div><div class="dragGroove"><img class="dragLump" src="images/live/drag.png"></div></div></div>');
//音量
    $('.live_volume>.drag>.dragGroove>.dragLump').dragging({
        move: 'x',
        randomPosition: true,
        videoId: myPlayer,
        bgDragGroovePath: '.live_volume>.drag>.bgDragGroove', //拖动的背景块的路径
        replaceImgPath: '.live_volume>.live_volume_box>img' //拖动块相对应的图标的路径
    });
    $('.live_volume>.drag').click(function (e) {
        let VolumeClickPosition = e.pageX - $(this).offset().left;
        if (VolumeClickPosition > 72) {
            $('.live_volume>.drag>.dragGroove>.dragLump').css({'left': '72px'});
            $('.live_volume>.drag>.bgDragGroove').css({'left': 0});
            $('.live_volume>.live_volume_box>img').attr('src', 'images/live/voice_3.png');
            myPlayer.volume(1);
        } else if (VolumeClickPosition < 8) {
            $('.live_volume>.drag>.dragGroove>.dragLump').css({'left': 0});
            $('.live_volume>.drag>.bgDragGroove').css({'left': '-72px'});
            $('.live_volume>.live_volume_box>img').attr('src', 'images/live/mute.png');
            myPlayer.volume(0);
        } else {
            let volume = 1 * (VolumeClickPosition - 4) / 72;
            $('.live_volume>.drag>.dragGroove>.dragLump').css({'left': (VolumeClickPosition - 4) + 'px'});
            $('.live_volume>.drag>.bgDragGroove').css({'left': -(76 - VolumeClickPosition) + 'px'});
            $('.live_volume>.live_volume_box>img').attr('src', 'images/live/volume.png');
            if (volume <= 0.33) {
                $('.live_volume>.live_volume_box>img').attr('src', 'images/live/voice_1.png');
            } else if (volume > 0.66) {
                $('.live_volume>.live_volume_box>img').attr('src', 'images/live/voice_3.png');
            } else {
                $('.live_volume>.live_volume_box>img').attr('src', 'images/live/voice_2.png');
            }
            myPlayer.volume(volume);
        }
    });
// let t = setInterval(function () {
//     if ($.cookie('watchTime') != null) {
//         let watchTime = parseInt($.cookie('watchTime'));
//         console.log(watchTime);
//         if (watchTime >= 50) {
//             $.cookie('watchTime', 50);
//             alert('你已超时！！！');
//             clearInterval(t)
//         } else {
//             $.cookie('watchTime', watchTime + 1);
//         }
//     } else {
//         $.cookie('watchTime', 0)
//     }
// }, 1000);
// setTimeout(function () {
//     $('#main').css('display','block')
// },5000)
    setHeight();
    // tab选项卡
    $("#tab").rTabs({
        bind: 'click',
        animation: 'left',
        auto: false
    });
// 表情
    $('.emotion').qqFace({
        id: 'facebox',
        assign: 'msgIpt',
        path: 'images/arclist/' //表情存放的路径
    });

// 图片
    $('#upload_file').change('on', function () {
        var file = $(this)[0].files[0];
        var r = new FileReader(); //本地预览
        r.readAsDataURL(file); //Base64
        r.onload = function () {
            var imgWidth, imgHeight, $img;
            var img = new Image();
            img.onload = function () {
                imgWidth = img.width;
                imgHeight = img.height;
                // _insertimg($img)
                // 判断为$('#msgIpt').html('')空还未写
                if ($('#msgIpt').html() != '') {
                    if ($('#msgIpt')[0].childNodes[$('#msgIpt')[0].childNodes.length - 1].nodeName.toLowerCase() == 'br') {
                        $('#msgIpt')[0].removeChild($('#msgIpt')[0].childNodes[$('#msgIpt')[0].childNodes.length - 1])
                    } else if ($('#msgIpt')[0].childNodes[$('#msgIpt')[0].childNodes.length - 1].nodeName.toLowerCase() == 'img') {
                        if (imgWidth <= 150) {
                            $img = "<br><img style='width:" + imgWidth + "px;' class='upload-img' src='" + r.result + "'><br><br>";
                        } else {
                            $img = "<br><img style='width:150px;' class='upload-img'  src='" + r.result + "'><br><br>";
                        }
                    } else if ($('#msgIpt')[0].childNodes[$('#msgIpt')[0].childNodes.length - 1].nodeName.toLowerCase() == '#text') {
                        if (imgWidth <= 150) {
                            $img = "<br><img style='width:" + imgWidth + "px;' class='upload-img'  src='" + r.result + "'><br><br>";
                        } else {
                            $img = "<br><img style='width:150px;' class='upload-img'  src='" + r.result + "'><br><br>";
                        }
                    }
                } else {
                    if (imgWidth <= 150) {
                        $img = "<img style='width:" + imgWidth + "px;' class='upload-img'  src='" + r.result + "'>";
                    } else {
                        $img = "<img style='width:150px;' class='upload-img'  src='" + r.result + "'>";
                    }
                }
                $('#msgIpt').append($img);
                var range = document.createRange();
                range.selectNodeContents($('#msgIpt')[0]);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }
            img.src = r.result;
        };
        document.getElementById('upload_file').setAttribute('type', 'text');
        setTimeout(function () {
            document.getElementById('upload_file').setAttribute('type', 'file');
        }, 10)
    });
});
// 点击切换直播流地址
// $('#main').click(function () {
//     var volume = myPlayer.volume();  //存储一个音量值，用于重加载或刷新使用。
//     myPlayer.reset();
//     myPlayer.src({
//         src: "rtmp://182.140.132.172/live/wangjunLive",
//         type:'rtmp/flv'
//     });
//     myPlayer.load();
//     setTimeout(function () {
//         myPlayer.play();
//         myPlayer.volume(volume);
//     },0)
// })
//表情转换 查看结果


window.onresize = function () {
    setHeight();
};
//锁定编辑器中鼠标光标位置。
function _insertimg(QQFaceStr) {
    console.log(QQFaceStr);
    $('#msgIpt').focus();
    var selection = window.getSelection ? window.getSelection() : document.selection;
    var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
    if (!window.getSelection) {
        var selection = window.getSelection ? window.getSelection() : document.selection;
        var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        range.pasteHTML(QQFaceStr);
        range.collapse(false);
        range.select();
    } else {
        range.collapse(false);
        var hasR = range.createContextualFragment(QQFaceStr);
        var hasR_lastChild = hasR.lastChild;
        while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
            var e = hasR_lastChild;
            hasR_lastChild = hasR_lastChild.previousSibling;
            hasR.removeChild(e)
        }
        range.insertNode(hasR);
        if (hasR_lastChild) {
            range.setEndAfter(hasR_lastChild);
            range.setStartAfter(hasR_lastChild)
        }
        selection.removeAllRanges();
        selection.addRange(range)
    }
}

//表情转换 查看结果
function replace_em(str) {
    str = str.replace(/\</g, '&lt;');
    str = str.replace(/\>/g, '&gt;');
    str = str.replace(/\n/g, '<br/>');
    str = str.replace(/\[em_([0-9]*)\]/g, '<img src="images/arclist/$1.gif" border="0" />');
    return str;
}
function setHeight() {
    try {
        let bodyHeight = window.innerHeight;
        let bodyWidth = window.innerWidth;
        let screenWidth = bodyWidth - 320 - 160 - 7;
        document.getElementsByClassName('live_header')[0].style.width = screenWidth + 'px';
        document.getElementsByClassName('c_right')[0].style.height = (bodyHeight - 24) + 'px';
        document.getElementById('my-video').style.height = screenWidth * 9 / 16 + 'px';
        document.getElementById('my-video').style.width = screenWidth + 'px';
        document.getElementById('videoCont').style.height = screenWidth * 9 / 16 + 'px';
        document.getElementById('videoCont').style.width = screenWidth + 'px';
        document.getElementById('flash').getElementsByTagName('img')[0].style.height = screenWidth * 9 / 16 + 'px';
        document.getElementById('flash').getElementsByTagName('img')[0].style.width = screenWidth + 'px';
        document.getElementsByClassName('c_right')[0].style.height = (screenWidth * 9 / 16 + 100 + 15) + 'px';
    } catch (e) {

    }
}