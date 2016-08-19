$(window).load(function(){

//1번문제
    function bgCss(target,bg,co){
        target.css({
            backgroundColor : bg,
            color : co,
            transition: '500ms'
        }).children().css({
            color : co
        });
    };
    $('nav ul li').on({
        'mouseover': function(){bgCss($(this),'rgba(0,0,0,0.7)','#DDD')},
        'mouseout': function(){bgCss($(this),'transparent','#000')}
    });

//2번문제
    $('nav ul li').click(function(){
        var alphabet = ['a','b','c','d','e','f','g','h'];
        var idx = $(this).index();
        var sct = $('.'+alphabet[idx]+'-type').offset().top;

        $('body').stop().animate({
            scrollTop: sct
        });
        return false;
    });

//3번문제
    slideFn = {
        idx : 0,
        movement : function(target,start,end){
            target.css({
                display:'block',
                left:start
            }).stop().animate({
                left:end
            });
        },
        moveOn : function(target){
            target.addClass('on').siblings().removeClass('on');
        }
    };
    //3-1, 3-2, 3-13. 다음버튼 클릭시 이동
    $('.slidebanner .next').click(function(){
        slideFn.movement($('.slidebanner li').eq(slideFn.idx).children('img'),0,'-100%');
        slideFn.idx++;
        if(slideFn.idx === $('.slidebanner li').length)  slideFn.idx = 0;
        slideFn.movement($('.slidebanner li').eq(slideFn.idx).children('img'),'100%',0);
        slideFn.moveOn($('.slidebanner li').eq(slideFn.idx));
    })

    //3-3, 3-4, 3-13. 이전버튼 클릭시 이동
    $('.slidebanner .prev').click(function(){
        slideFn.movement($('.slidebanner li').eq(slideFn.idx).children('img'),0,'100%');
        slideFn.idx--;
        if(slideFn.idx === -1)  slideFn.idx = $('.slidebanner li').length - 1;
        slideFn.movement($('.slidebanner li').eq(slideFn.idx).children('img'),'-100%',0);
        slideFn.moveOn($('.slidebanner li').eq(slideFn.idx));
    })

    //3-5, 3-11. 이미지 이동
    var slideInv = setInterval(function(){$('.slidebanner .prev').click();},4500);

    //3-6, 3-7. 마우스 오버 이벤트
    $('.slidebanner ul, .slidebanner button').on({
        'mouseenter': function(){clearInterval(slideInv);},
        'mouseleave': function(){slideInv = setInterval(function(){$('.slidebanner .prev').click();},4500);}
    });

    // 3-8, 3-9, 3-11. 버튼 클릭시 이동
    $('.slidebanner li a').click(function(){
        var sel = $(this).parent('li').index();
        var his = $('.slidebanner .on').index();
        if( sel > his){
            slideFn.movement($('.slidebanner li').eq(his).children('img'),0,'-100%');
            slideFn.movement($('.slidebanner li').eq(sel).children('img'),'100%',0);
            slideFn.idx = sel;
            slideFn.moveOn($('.slidebanner li').eq(slideFn.idx));
        }else if( sel < his){
            slideFn.movement($('.slidebanner li').eq(his).children('img'),0,'100%');
            slideFn.movement($('.slidebanner li').eq(sel).children('img'),'-100%',0);
            slideFn.idx = sel;
            slideFn.moveOn($('.slidebanner li').eq(slideFn.idx));
        };
    });
    // 3-10. 사진 랜덤 바꾸기
    var adress = [];
    var imsi = [];
    $('.slidebanner li').each(function(i){
        imsi.push(i);
    });
    for(i=0; i < imsi.length; i++){
        var ran = Math.floor(Math.random() * imsi.length);
        adress.push(imsi[ran]);
        imsi.splice(ran,1);
    };
    imsi = '';
        for(i=0;i < Math.ceil( length / 2) ; i++){
            imsi = $('.slidebanner li').eq(i).children('img').attr('src');
            $('.slidebanner li').eq(i).children('img').attr({
                'src': $('.slidebanner li').eq(adress[i]).children('img').attr('src') });
            $('.slidebanner li').eq(adress[i]).children('img').attr('src',imsi);
        };

//4번문제
    var fadeFn = {
        idx : 0,
        movement : function(index){
            $('.fadebanner .on').children('img').fadeOut();
            $('.fadebanner li').eq(index).children('img').fadeIn();
            fadeFn.idx = index;
        },
        nextMove : function(){
            if($('.fadebanner .on').index() === $('.fadebanner li').length - 1 ){
                fadeFn.movement(0);
            }else{
                fadeFn.movement($('.fadebanner .on').index() + 1);
            };
            slideFn.moveOn($('.fadebanner li').eq(fadeFn.idx));
        }
    };
    // 4-1. 인터벌
    fadeInv = setInterval(function(){fadeFn.nextMove()},4800);
    // 4-2, 4-3. 마우스 오버 이벤트
    $('.fadebanner').on({
        'mouseenter':function(){clearInterval(fadeInv);},
        'mouseleave':function(){fadeInv = setInterval(function(){fadeFn.nextMove()},4800);}
    });
    //4-4, 4-5. 버튼 클릭시 이동
    $('.fadebanner li a').click(function(){
        fadeFn.movement($(this).parent('li').index());
        slideFn.moveOn($('.fadebanner li').eq(fadeFn.idx));
    });

//5번문제
    // 5-2. 클릭시 이미지변환
    $('.movie-view li').click(function(){
        var adr = $(this).children('a').attr('href');
        $('.view iframe').attr('src','https://www.youtube.com/embed/'+adr+'?rel=0&amp;controls=0&amp;showinfo=0');
        //5-3. 클릭시 반투명
        $(this).find('img').css('opacity','0.5').parents('li').siblings().find('img').css('opacity','1');
        return false;
    });

//6번문제
    $(window).scroll(function(){
        $('.wing').stop().animate({
            top: $('body').scrollTop()
        });
    });
//7번문제
    var popFn = {
        makeBlind : function(){
            $('body').append('<div class="blind"></div>');
            $('.blind').css({
                display: 'block',
                position : 'fixed',
                top:0,
                bottom:0,
                left:0,
                right:0,
                backgroundColor: 'rgba(0,0,0,0.7)'
            });
        },
        makePop : function(target){
            target.css({
                display:'block',
                position:'fixed',
                zIndex:1
            });
            target.append('<button class="close">닫기</button>');
            popFn.centerPop(target);
            target.animate({
                top: '50%',
                marginTop: -target.height() / 2
            });
        },
        centerPop : function(target){
            target.css({
                position: 'fixed',
                left: '50%',
                marginLeft: -target.width() / 2,
                top: -$(window).height()
            });
        },
        closePop : function(){
            $('.blind').fadeOut(function(){$(this).remove();});
            $('.pop').fadeOut(function(){$(this).css({top : -$(window).height()});});
            $('.close').fadeOut(function(){$(this).remove();});
        }
    }

    //버튼 클릭 이벤트
    $('.btngroup button').each(function(i){
        var j = i + 1;
        $('.btngroup .eventBt0' + j).click(function(){
            //7-1, 7-3. 팝업 나와서 애니메이션, 닫기버튼 생성
            popFn.makePop( $('.event'+j+'.pop') );
            //7-2. 블라인드 만들기
            popFn.makeBlind();

        });
    });
    // 7-4, 7-5.
    $('.pop').on('click','.close',popFn.closePop);
    //블라인드 클릭시 닫기
    $('body').on('click','.blind',popFn.closePop);
})
