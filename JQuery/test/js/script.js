// 1번
$(function(){
    
    function change_Bgc_Co(target,bgc,co){
        target.css({
            transition: '500ms',
            backgroundColor:bgc,
            color:co
        }).children().css({
            color:co
        });
    };
    $('nav ul li').on({
        'mouseover':function(){change_Bgc_Co($(this),'rgba(0,0,0,0.5)','#DDD')},
        'mouseout':function(){change_Bgc_Co($(this),'transparent','#000')}
    })

// 2번
    
    //section에 id 부여
    $('section').each(function(i){
        $('section').eq(i).attr('id','page'+i);
    });
    //click event 발생 시 id로 애니메이션
    $('nav ul li a').click(function(){
        var idx = $(this).parent('li').index();
        
        $('body').animate({
            scrollTop : $('#page'+idx).offset().top
        });
        
        return false;
    });

// 3번
    //관련함수 객체선언
    var slideFnc = {
        idx : 0,
        movement : function(target,start,end){
            target.css({
                display:'block',
                left : start
            }).stop().animate({
                left:end
            });
        },
        randomPickUp : function(leng,targets,att){
            //랜덤순서생성
            var adress = []; 
            var imsi = [];
           
                for(i=0; i<leng; i++){
                    imsi.push(i);
                }
                for(j=0; j <leng; j++){
                    var ran = Math.floor(Math.random() * imsi.length)
                    adress.push(imsi[ran]);
                    imsi.splice(ran,1);
                }
                
            //집어넣기 과정  
            imsi = '';
                for(i=0;i < Math.ceil( leng / 2) ; i++){
                    //보존
                    imsi = targets.eq(i).children('img').attr(att);
                    //교체
                    targets.eq(i).children('img').attr(
                        att, targets.eq(adress[i]).children('img').attr(att)
                    )
                    //보존속성 삽입
                    targets.eq(adress[i]).children('img').attr(att, imsi);
                }    
        },
        moveOn : function(target){
            target.addClass('on').siblings().removeClass('on')
        }
    };
    //다음버튼 click시 event, 문제 1. 2. 13.
    
    $('.slidebanner .next').click(function(){
        slideFnc.movement($('.slidebanner ul li').eq(slideFnc.idx).children('img'),0,'-100%');
        slideFnc.idx++;
        slideFnc.movement($('.slidebanner ul li').eq(slideFnc.idx).children('img'),'100%',0);
        slideFnc.moveOn($('.slidebanner ul li').eq(slideFnc.idx))
        
        if (slideFnc.idx >= $('.slidebanner ul li').length){
            slideFnc.idx = 0;
            slideFnc.movement($('.slidebanner ul li').eq(slideFnc.idx).children('img'),'100%',0);
            slideFnc.moveOn($('.slidebanner ul li').eq(slideFnc.idx))
        }
    });
    //이번버튼  click시 event, 문제 3. 4. 13.
    $('.slidebanner .prev').click(function(){
        slideFnc.movement($('.slidebanner ul li').eq(slideFnc.idx).children('img'),0,'100%');
        slideFnc.idx--;
        slideFnc.movement($('.slidebanner ul li').eq(slideFnc.idx).children('img'),'-100%',0);
        slideFnc.moveOn($('.slidebanner ul li').eq(slideFnc.idx))
        
        if (slideFnc.idx < 0){
            slideFnc.idx = $('.slidebanner ul li').length - 1;
            slideFnc.movement($('.slidebanner ul li').eq(slideFnc.idx).children('img'),'-100%',0);
            slideFnc.moveOn($('.slidebanner ul li').eq(slideFnc.idx))
        }
    });
    //interval 선언, 문제 5. 11.
    var interval_c = setInterval(function(){
        $('.slidebanner .prev').click()
    },4500);
    //mouse event에 따라 interval 조절, 문제 6. 7. 11.
    $('.slidebanner ul').on({
        'mouseenter':function(){clearInterval(interval_c);},
        'mouseleave':function(){
            interval_c = setInterval(function(){
                $('.slidebanner .prev').click();
            },4500)
        }
    });
    //번호 클릭시 event, 문제 8. 9. 12.
    $('.slidebanner ul li a').click(function(){
        var selc = $(this).parent().index();
        var his = $('.slidebanner ul .on').index();
        
        if( selc > his ) {
            slideFnc.movement($('.slidebanner ul li').eq(his).children('img'),0,'-100%');
            slideFnc.movement($('.slidebanner ul li').eq(selc).children('img'),'100%',0);
            slideFnc.moveOn($('.slidebanner ul li').eq(selc));
        }else if( selc < his ) {
            slideFnc.movement($('.slidebanner ul li').eq(his).children('img'),0,'100%');
            slideFnc.movement($('.slidebanner ul li').eq(selc).children('img'),'-100%',0);
            slideFnc.moveOn($('.slidebanner ul li').eq(selc));
        }
    });
    //랜덤 시작, 문제 10.
    slideFnc.randomPickUp($('.slidebanner ul li').length, $('.slidebanner ul li'),'src');
//4번
    //관련함수 객체선언
    var fadeFnc = {
        idx : 0,
        fadeMove : function(target1,target2){
            target1.children('img').fadeOut();
            target2.children('img').fadeIn();
        }
    };
    //순환하며 움직이는 함수선언
    function dInvFnc(){
       if(fadeFnc.idx == $('.fadebanner ul li').length - 1){
            fadeFnc.idx = 0;
            fadeFnc.fadeMove($('.fadebanner ul .on'),$('.fadebanner ul li').eq(fadeFnc.idx));
       }else{
           fadeFnc.fadeMove($('.fadebanner ul li').eq(fadeFnc.idx),$('.fadebanner ul li').eq(fadeFnc.idx + 1));
           fadeFnc.idx++;
       }
       slideFnc.moveOn($('.fadebanner ul li').eq(fadeFnc.idx));
    }
    // interval 선언, 문제 1.
    var interval_d = setInterval(function(){dInvFnc()},4800);
    //mouse event에 따라 interval 조절, 문제 2. 3.
    $('.fadebanner ul').mouseenter(function(){
        clearInterval(interval_d);
    }).mouseleave(function(){
        interval_d = setInterval(function(){dInvFnc()},4800);
    });
    //번호 click event, 4. 5.
     $('.fadebanner ul li a').click(function(){
        fadeFnc.idx = $(this).parent('li').index();
        
        fadeFnc.fadeMove($('.fadebanner ul .on'),$('.fadebanner ul li').eq(fadeFnc.idx))
        slideFnc.moveOn($('.fadebanner ul li').eq(fadeFnc.idx)); 
     });
    
//5번
    //클릭시 iframe 주소 변경, 문제 2.
    $('.movie-view ul li a').click(function(){
        var aa = $(this).attr('href');
        $('.view iframe').attr('src','https://www.youtube.com/embed/'+aa+'?rel=0&amp;controls=0&amp;showinfo=0');
        //투명도, 문제 3.
        $(this).css({
            opacity : '0.5'
        }).parent('li').siblings().children('a').css({
            opacity : '1.0'
        });
        return false;
    });
//6번
    $(window).scroll(function(){
        $('.wing').stop().animate({
            top : $(window).scrollTop()
        })
    })
    


//7번
    //관련함수 객체선언
    var popFnc = {
        
        blind : function(){
            $('body').append('<div class="blind"></div>');
            $('.blind').css({
                position:'fixed',
                top:0,
                bottom:0,
                left:0,
                right:0,
                backgroundColor:'#000',
                display:'none'
            }).fadeTo('1000ms',0.5);
        },
        makePop : function(target){
            target.css({
                display : 'block',
                position : 'fixed',
                bottom : $(window).height()
            })
            target.append('<button class="close">닫기</button>')
        },
        centerPop :function(target){
            target.css({
                left:'50%',
                marginLeft: -target.width() / 2,
                zIndex:1
            })
        },
        openPop : function(target){
            this.blind();
            this.makePop(target);
            this.centerPop(target);
            
            target.animate({
                top: '50%',
                marginTop: -target.height() / 2
            })
        },
        closeFnc : function(){
            $('.blind').fadeOut(function(){
                $(this).remove();
            });
            $('.pop').fadeOut().css({top : -$(window).height()});
            $('.close').fadeOut().remove();
        }
    };
    //블라인드 클릭하면 블라인드 사라지기..심심해서 해봄
    $('body').on('click','.blind',function(){
        
        $('.blind').fadeOut(function(){
            $(this).remove();
        });
        $('.pop').fadeOut().css({top : -$(window).height()});
        $('.close').fadeOut().remove();
    });
    //클릭시 팝업 나옴, 문제 1. 2. 3. 
    $('.btngroup button').each(function(i){
       var j = i + 1;
       $('.btngroup .eventBt0'+j).click(function(){
        popFnc.openPop($('.event'+j+'.pop'));
        }); 
    });
    $('body').on('click','.close',popFnc.closeFnc)
    
})