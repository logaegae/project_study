/* main slide event */
jQuery(function(){
        //설정할 것 : #slide > div
	    //슬라이드 선택
	    var visual = $('#slide > div');
	    //설정할 것 : .page_btn > ul > li'
	    //버튼 선택
	    var button = $('.page_btn > ul > li');
	    //현재 주소를 0으로 설정
	    var current = 0;
	    //시간이 지나면 넘어갈 변수 설정
	    var setIntervalId;
	    
        //button을 클릭시 실행할 함수를 설정
        
        //설정할 것 : on클래스
        //on 클래스는 버튼에 부여, 클릭하면 이동
	    button.on({
	    
	        click:function(){
	        
	            var tg = $(this);
	            
	            var i = tg.index();

	            button.removeClass('on');
	            
	            tg.addClass('on');
	            

	            move(i);
	            
	        }
	    });
	    //설정할 것 : .page_btn
	    //page_btn에 마우스 올리면 인터벌 중지
	    $(".page_btn").on({
	    
	        mouseover:function(){
	            clearInterval(setIntervalId);
	            
	        },
	        mouseout:function(){
	        
	            timer();
	            
	        }
	    });
	    
	    timer();
	    
	    function timer(){
	    
	        setIntervalId = setInterval(function(){
	        
	            var n = current + 1;
	            
	            //$('#slide > div')의 갯수 만큼 순환
	            if(n == visual.size()){
	            
	                n = 0;
	                
	            }
	            //설정할 것 : button의 eq
	            button.eq(n).trigger('click');
	            
	        }, 4500);
	    }
	    
	    function move(i){
	   
	        var currentEl = visual.eq(current);
	        
	        var nextEl = visual.eq(i);
	        
	        currentEl.fadeOut();
	        
	        nextEl.fadeIn("fast");
	        

	        current = i;     
	        
	    }
	});	