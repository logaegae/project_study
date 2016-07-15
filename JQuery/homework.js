//popup
	$('.propop').on({
	//class propop에 event예약
		click:function(){
		//click하면 함수를 실행, $('.propop').click(function(){})은 쓸 수 없는 상황인듯??
			blind();
			//blind함수 실행, 화면이 어두워질 것(?)
			$('body').append('<div class="product_popup mobile"><button>열기</button></div>')
			//body의 자식요소로 div(팝업창)와 버튼을 생성하여 첨부
			$('.product_popup > button').addClass('close')
			//생성한 버튼에 close class부여, 열기 버튼인데 class명은 왜 close???
			centerpop($('.product_popup'))
			//생성한 팝업에 centerpop함수를 적용
			var content_targent = '.'+$(this).attr('id');
			//class propop의 id를 가져오고 class주소화 한 후 content_targent로 저장
			var target_html = $(content_targent).html();
			//content_targent과 동일한 이름을 가진 class의 html요소를 불러 온 후 변수에 저장
			$('.product_popup').append('<div class="pro-pop-wrap">'+target_html+'<div>');
			//target_html에 저장한 html요소들을 div로 wrap한 후에 팝업창에 자식요소로 첨부
			$('.close').click(function(){
			//close button click시 함수 실행
				$('.product_popup').animate({
				//팝업창에 애니메이션 설정
					'top':$(window).scrollTop()+$(window).height()
					//윈도우에서 사라지게 밑으로 내려감
				},function(){
				//애니메이션이 끝나면 함수가 실행됨
					$(this).remove()
					//팝업창 삭제
					$('.blind').fadeOut(function(){
					//블라인드가 fadeOut으로 사라짐
						$(this).remove()
						//fadeOut이 끝나면 삭제됨
					})
					
				})
				
			})
			return false;
			//지정한 click이벤트 이외의 기능은 꺼버림
		}
		
	})
	
	
	$(window).resize(function(){
		//window를 resize할 경우 함수를 실행
		centerpop($('.product_popup'))
		//팝업창을 대상으로 centerpop함수(가운데 정렬) 실행, 그러면 리사이즈할때마다 밑에서 위로 올라온다??
	})
	
	
	function centerpop(targent){
		//centerpop함수를 정의, 매개변수는 targent
		targent.css({
			//targent의 css속성을 변경
			'margin-left':'50%',
			//margin값을 추가해 화면 가운데로 이동 50%
			'left':-(targent.width()/2)+'px',
			//왼쪽으로 targent길이의 반만큼  position 이동
			'top':$(window).scrollTop()+$(window).height()
			//윈도우의 하단에 안보이게 position배치
		}).show().animate({
		//애니메이션 실행
			'top':$(window).scrollTop()+40
			//윈도우의 상단에서 40만큼 떨어진 위치로 올림
		})
	}
	window._centerpop = centerpop;	
	//window객체의 centerpop속성에 centerpop함수를 대입
	
		// +++++++++++++++++read 2
	
	
	
	
	
	
	
	
var __onbodyclick = function(){};
//변수 onbodyclick에 콜백함수 지정
var __onscroll = function(){};
//onscroll에 콜백함수 지정
$(function(){
	//문서가 준비되면 스크립트 실행
	//gnb
	$('.first_lnb>li>a').on({
		//class first_lnb의 a테그 클릭시 실행할 함수를 설정
		click:function(){
			
			if ($(this).attr("href") == "") {
			//a테그의 링크주소가 아무것도 없는 문자열이라면(그냥 버튼)
				$(this).parent().children('div').slideToggle().parent('li').addClass('on').siblings('li').removeClass('on').children('div').hide();
				//a테그 부모의 자식요소 div에 slideToggle로 나오고, 그 부모요소 li에는 class on부여, 나머지 li요소들은 class on을 지우고 그들의 자식요소 div들은 hide한다
				return false;
				//지정한 기능 외의 동작은 꺼버림
			}
		}
	
	});
	
	$('.mobilegnb').click(function(){
	//class mobilegnb를 클릭시 함수를 실행
		$(this).next('nav').slideToggle()
		//해당 class의 다음 nav 요소를 slide로 toggle
	})
	
	$(window).resize(function(){
	//window를 resize할 시 함수를 실행
		var width = $(this).width()
		//변수 width에 window의 width값을 대입
		if(width > 736){
		//width값이 736이상이면
			$('.gnb nav').show()
			//gnb의 자식요소 nav가 show로 나타나고
		}else{
		//그 밖의 width값이면
			$('.gnb nav').hide()
			//hide로 숨긴다
		}
		
	})
	
	// gnb mouseleave event 
	var sub_open = false;
	//변수 sub_open에 flase boolean값을 대입, default값으로 지정
	$('.first_lnb>li>div').mouseleave(function(){
	//class first_lnb의 자식요소 div에 마우스가 떠나면 함수가 실행됨
		sub_open = true;
		//sub_open을 true boolean값으로 대입
		
	});
	
	__onbodyclick = function(){
	//변수 선언만 해 두었던 __onbodyclick에 함수를 대입
		if($('.first_lnb>li').is('.on') && sub_open){
		//class first_lnb의 자식요소 li들 중에 class on이 있고, 마우스가 div에 떠나있다면
			$('.first_lnb>li>div').slideUp()
			//그 div가 slideup으로 올라간다
			sub_open = false;
			//sub_open은 default값으로 전환
			
		}
	};
	
	$('body').click(__onbodyclick);
	//body를 클릭하면 __onbodyclick함수가 실행
	
	// main slide event 
	jQuery(function(){
	//문서가 ready하면 script를 불러 옴
	    var visual = $('#slide > div');
	    //변수 visual에 id slide의 자식요소 div를 선택한 값을 대입
	    var button = $('.page_btn > ul > li');
	    //변수 button은 class page_btn의 자식요 li를 선택한 값을 대입
	    var current = 0;
	    //변수 current는 0
	    var setIntervalId;
	    //변수 setIntervalId 선언

	    button.on({
	    //button을 클릭시 실행할 함수를 설정
	        click:function(){
	            var tg = $(this);
	            //변수 tg에 click된 버튼 값을 대입
	            var i = tg.index();
	            //변수 i에 click된 버튼의 index값을 대입

	            button.removeClass('on');
	            //모든 버튼에 class on을 지움
	            tg.addClass('on');
	            //클릭된 버튼에 class on 부여, on클래스의 이동

	            move(i);
	            //i값을 인자로 move함수 실행, 클릭한 곳으로 이동할 것
	        }
	    });
	    
	    $(".page_btn").on({
	    //class page_btn에 마우스를 올리면 실행될 함수를 설정
	        mouseover:function(){
	            clearInterval(setIntervalId);
	            //setIntervalId의 setInterval을 멈춤
	        },
	        mouseout:function(){
	        //마우스가 떠나면 함수가 실행
	            timer();
	            //timer함수가 실행
	        }
	    });
	    
	    timer();
	    //timer함수가 실행
	    function timer(){
	    //timer함수 설정
	        setIntervalId = setInterval(function(){
	        //변수setIntervalId로 setInterval Method실행, 4.5초마다 함수를 실행
	            var n = current + 1;
	            //변수 n 은 변수 current에 1을 더함
	            if(n == visual.size()){
	            //#slide > div의 요소 개수와 지정한 n의 숫자와 같다면
	                n = 0;
	                //n은 0으로 다시 초기화
	            }
	            
	            button.eq(n).trigger('click');
	            //4.5초마다 변하는 n값을 index로 하는 버튼을 click 실행
	        }, 4500);
	    }
	    
	    function move(i){
	    //매개변수를 i로 하는 move함수 정의
	        var currentEl = visual.eq(current);
	        //변수 currentEl에 current값을 index로 하는 visual의 slide의 div값을 대입
	        var nextEl = visual.eq(i);
	        //변 nextEl에 매개변수i(클릭한 index주소값)에 해당하는 visual slide의 div값을 대입
	        currentEl.fadeOut();
	        //currentEl(현재 나와있는 슬라이드)는 fadeOut
	        nextEl.fadeIn("fast");
	        //nextEl(클릭하여 넘어갈 슬라이드)는 fadeIn, 속도는 fast

	        current = i;     
	        //current 은 내가 클릭한 slide의 index값
	    }
	});	
	
	
	// main button event
	$('.default_btn').hover(function(){
	//class default_btn에 hover하면 함수를 실행
		$(this).stop().animate({
		//default_btn에 애니메이션 설정
			'padding':'0 40px'
			//padding값이 위아래로 40px
		},500);
		//시간은 0.5초
	},function(){
	//애니메이션이 끝나면 함수 실행
		$(this).stop().animate({
		
			'padding':'0 10px'
			//padding값이 위아래 10px로
		},500);
		//시간은 0.5초
	});
	
	
	
	// main radius btn event
	$('.radius_btn').hover(function(){
	//.radius_btn에 hover하면 함수가 실행
		$(this).find('span:eq(1)').stop().animate({
		//현주소에서 첫번째 span을 찾아서 애니메이션 실행
			'padding':'0 20px'
			//padding 위아래로 20px
		},500);
		//0.5초
	},function(){
	//에니메이션 완료 후 함수 실행
		$(this).find('span:eq(1)').stop().animate({
			//현주소에서 첫번째 span을 찾아서 애니메이션 실행
			'padding':'0'
			//padding 0으로
		},500);
		//시간은 0.5초
	});
	
	//top gnb script
	var gnb_height = $('.gnb').height();
	// .gnb의 높이 값을 추출하여 변수 gnb_height에 대입
	
	__onscroll = function(){
		// __onscroll 함수 선언
		var sct = $(this).scrollTop();
		// 대상의 scrollTop을 추출하여 변수 sct에 대입
		
		if(sct > 80 && !$('header').is('.sct_active') && $(window).width() > 736){
		// scrollTop값이 80이상이고 header에 .sct_active가 없으며 윈도우의 가로값이 736이상일 경우
			$('header').addClass('sct_active');
			// header에 sct_active클래스를 부여
			$('.gnb').css({
			// .gnb의 css를 설정
				"position":"relative",
				
				"z-index":"10"
				// 순서 앞으로
					}).before('<div class="header_bg"></div>');
					// gnb 앞에 .header_bg인 div 삽입
			
			$('.header_bg').css({
			// .header_bg의 css설정
				"height":"90px",
				"background":"#000",
				"position":"absolute",
				"top":"0",
				"z-index":"5",
				"width":"100%",
				"display":"none"
			}).fadeTo(500,0.5);
			// 나타나는 투명도 설정
		}else if(sct < 80 && $('header').is('.sct_active') && $(window).width() >763){
			// scrollTop값이 80이하이면서 header에 .sct_active 가 존재하고 window의 가로길이가 763보다 작을때
			$('header').removeClass('sct_active');
			// header에 .sct_active 클래스 삭제
			$('.header_bg').fadeOut(500,function(){
				// .header_bg가 0.5초로 사라진 후 함수가 실행됨
				$('.header_bg').remove();
				// .header_bg 삭제
			});
			
		}
		
	};
	$(window).on("scroll", __onscroll);
	// window에 scorll을 하게 되면 __onscroll이 실행되게 설정
	
	//媛쒕컻�� 留욊쾶 �섏젙 �꾩슂
	$('.arrow-box').hide()
	// .arrow-box hide로 숨기기
	$('.ckecked_btn').click(function(){
	// .ckecked_btn을 클릭하면 함수가 실행됨
		//
		$('.arrow-box').show().css({
		// .arrow-box가 show로 나타나고 css설정됨	
			'top':$(this).position().top - 5,
			// 높이는 현재위치에서 top position에서 5 올라감
			'left':$(this).position().left + $(this).innerWidth()
			// 왼쪽은 현재위치에서 innerWidth(border값을 뺀 내부 width)
			
		})
		return false;
		// 다른 기능 차단
	})
	
	
	
	//faq
	$('.faqlist>ul>li').click(function(){
		// .faqlist>ul>li click시 함수 실행
		$('.faqlist>ul>li').children('div').stop().slideUp()
		// .faqlist>ul의 모든 자식요소 li의 자식요소 div를 slideUp()
		$(this).children('div').stop().slideToggle()
		// 클릭한 li의 자식요소 div에 slideToggle
		
	})
	
	
	
	//popup
	$('.propop').on({
	// 첫번째 스크립트와 상동
		click:function(){
			blind();
		
			$('body').append('<div class="product_popup mobile"><button>�リ린</button></div>')
			$('.product_popup > button').addClass('close')
			
			centerpop($('.product_popup'))
			
			var content_targent = '.'+$(this).attr('id');
			var target_html = $(content_targent).html();
			
			$('.product_popup').append('<div class="pro-pop-wrap">'+target_html+'<div>');
			
			$('.close').click(function(){
				// 클릭시 함수 실행
				$('.product_popup').animate({
					'top':$(window).scrollTop()+$(window).height()
				},function(){
					$(this).remove()
					$('.blind').fadeOut(function(){
						$(this).remove()
					})
					
				})
				
			})
			return false;
		}
		
	})
	
	$(window).resize(function(){
		
		centerpop($('.product_popup'))
	})
	
	
	
	
	function centerpop(targent){
		
		targent.css({
			
			'margin-left':'50%',
			'left':-(targent.width()/2)+'px',
			'top':$(window).scrollTop()+$(window).height()
				
		}).show().animate({
			'top':$(window).scrollTop()+40
		})
	}
	window._centerpop = centerpop;
	// 여기까지 상동
	
	
	//address
	$('.pop-open').on({
	// .pop-open을 클릭하면 함수가 실행되도록 설정
		click:function(){
			
			blind();
			// blind 함수 실행
			centerpop($('.addpop'));
			// .addpop에 centerpop함수 적용
			return false
			// 다른 기능 차단
			
		}
	})
	
	$('.addpop .close').on({
		// .addpop .close click시 함수가 실행되도록 설정
		click:function(){
			
			$('.blind').remove()
			// .blind 삭제
			$('.addpop').hide()
			// .addpop hide로 숨기기
			return false
			// 다른기능 차단
		}
	})
	
	//address
	
	var addnumber = null;
	var addstring = null;
	var refaddres = null;
	//변수들 선언
	
	$('.addtable tbody tr').on({
		click:function(){
	// .addtable tbody tr 클릭시 함수 실행되도록 설정
			
			addnumber = $(this).find('td:eq(0)').html();
			// 현 경로에서 첫번째 td의 html 가져와 저장
			addstring = $(this).find('td:eq(1)').html();
			// 현 경로에서 두번째 td의 html 가져와 저장
			refaddres = $(this).find('td:eq(2)').html();
			// 현 경로에서 세번째 td의 html 가져와 저장
		
		}
	});
	
	
	
	$('.old-addconfim').on({
		click:function(){
		// .old-addconfim 클릭시 함수 실행되도록 설정	
			if(addnumber == null && addstring==null){
			// addnumber와 addstring이 초기값 그대로이면(주소가 입력되지 않았다면)	
				$('.blind').remove();
				// .blind 삭제
				$('.addpop').hide();
				// .addpop hide로 숨김
			}else if(addnumber != null&&addnumber != null){
				// addnumber와 addnumber이 초기값과 다르다면(주소가 입력이 됬다면)
				// 여기 틀린 듯... addnumber이 아니라 하나는 addstring
				
				var stnum = String(addnumber);
				// addnumber를 문자화 하여 저장
				var firstnum = stnum.substring(0,3);
				// 저장된 값의 앞에서 부터 3개 문자를 firstnum에 저장
				var lastnum = stnum.substring(4,7);
				// 저장된 값의 4번째부터 6번째 까지의 문자를 lastnum에 저장
				var address_test = addstring;
				// addstring을 address_test에 저장
				
				$('.addfirstnum').val(firstnum);
				// .addfirstnum의 value에 firstnum에 �������장된 값을 입력
				$('.addlastnum').val(lastnum);
				// .addlastnum의 value에 lastnum에 저장된 값을 입력
				$('.address_type1').val(address_test);
				// .address_type1의 value에 address_test에 저장된 값을 입력
				$('.blind').remove();
				// .blind 삭제
				$('.addpop').hide();
				// .addpop을 hide로 숨김
				
			}
			
			return false;
			// 다른기능 차단
		}
	})
	
	$('.new-addconfim').on({
		click:function(){
		// .new-addconfim 클릭시 함수 실행되도록 설정	
			if(addnumber == null && addstring==null){
			// addnumber와 addstring이 초기값 그대로이면(주소가 입력되지 않았다면)	
				$('.blind').remove();
				// .blind 삭제
				$('.addpop').hide();
				// .addpop을 hide로 숨김
			}else if(addnumber != null&&addstring != null){
				// addnumber와 addnumber이 초기값과 다르다면(주소가 입력이 됬다면)
				var stnum = String(addnumber);
				// addnumber를 문자화 하여 저장
				var firstnum = stnum.substring(0,3);
				// 저장된 값의 앞에서 부터 4개 문자를 firstnum에 저장
				var lastnum = stnum.substring(4,7);
				// 저장된 값의 5번째부터 8번째 까지의 문자를 lastnum에 저장
				var address_test = addstring;
				// addstring을 address_test에 저장
				
				$('.addfirstnum').val(firstnum);
				// .addfirstnum의 value에 firstnum에 저장된 값을 입력
				$('.addlastnum').val(lastnum);
				// .addlastnum의 value에 lastnum에 저장된 값을 입력
				$('.address_type1').val(address_test);
				// .address_type1의 value에 address_test에 저장된 값을 입력
				$('.blind').remove();
				// .blind 삭제
				$('.addpop').hide();
				// .addpop을 hide로 숨김
				
			}
			
			return false;
			// 다른기능 차단
		}
	})
	
	
	
	//join add
	var add_count = 0;
	//
	$('.sn-add').on({
		
		click:function(){
	// .sn-add클릭시 함수가 실행되도록 설정
			add_count +=1;
			// count 1 증가
			$(this).parent('td').append('<br /><input type="text" style="width:300px; margin-top:5px"  id="number" name="sn[]" />');
			return false;
			// 다른기능 차단
		}
	});
	
	
	
	//email
	$('.select-mail').change(function(){
	// .select-mail이 change(?)하면 함수 실행	
		console.log('aa')
		$('.mailaddress').val($(this).val())
		// .mailaddress의 value에 .select-mail의 value값 입력
	})
	
	$('.addpop .tab li').on({
		
		click:function(){
	// .addpop .tab li클릭시 함수가 실행되도록 설정
			$(this).addClass('on').siblings().removeClass('on');
			// 현 경로에 class on을 add하고 다른 형제요소들의 class on 삭제
			return false;
			// 다른기능 차단
		}
	})
	
	
	function blind(){
	// blind 함수 선언
		$('body').append('<div class="blind"></div>')
		// body의 자식요소들 뒤에 .blind div 첨부
		$('.blind').fadeTo(1000,0.8)
		// .blind가 1초동안 0.8의 투명도로 fadeOut
		
	}
	window._blind = blind;
	// window객체의 _blind속성에 blind 함수 내용 대입
	
	
	
	//community list
	$('.meteora_news ul li').find('img').css({
	// .meteora_news ul li에서 img요소를 찾아 css설정	
		'width':'103%',
		'margin-left':'-20px'
		// 사진이 3%커지고 왼쪽으로 배치
	}).parent().parent('div').css('overflow','hidden')
	// 그 부모의 부모요소 div의 css overflow:hidden 설정(커져도 안넘어감)
	$('.meteora_news ul li').hover(function(){
	// .meteora_news ul li에 hover하면 함수 실행
		$(this).find('img').stop().fadeTo(200,0.3).animate({
		// img요소를 찾아 0.3의 투명도로 0.2초동안 fade로 나타나고 애니메이션 효과
			'margin-left':'0'
			// 왼쪽으로 갔던 이미지가 원래대로 돌아오는 애니메이션
		})
	},function(){
		// 애니메이션 완료 후 함수 실행
		$(this).find('img').stop().fadeTo(200,1).animate({
		// img요소를 찾아 02초동안 완전히 선명해지면서 fadeOut효과와 애니메이션 지정
			'margin-left':'-20px'
			// 다시 왼쪽으로 이동하는 애니메이션
		})
		
	})
	
	//id pw
	$('.login_box input').on({
		click:function(){
	// .login_box input클릭시 함수가 실행되도록 설정	
			
			if($('#parson_member').is('input:checked')){
				
			// #parson_member에 input:checked(?????)가 있으면 
			
				$('.usermesg').text('�대쫫怨� �대찓��');
				// .usermesg에 text삽입
			}else if($('#company_member').is('input:checked')){
			// #company_member에 input:checked(????) 가 있으면
				$('.usermesg').text('湲곗뾽怨� �대찓��');
				// .usermesg에 text삽입
			}
			
		}
	})
	

	var callback = function(){};
	// callback 이름으로 콜백함수 선언
	function messageAlet(msg, cb){
	// 매개변수 msg, cb로 messageAlet 함수 선언
		//var megtxt = [
		//              "怨좉컼�섏쓽 �꾩씠�붾뒗 ["+param1+"] �낅땲��.",
		//              "�낅젰�섏떊�뺣낫媛� �쇱튂�섏� �딆뒿�덈떎.<br/>�뺣낫 �ㅼ떆 �뺤씤 �댁＜�몄슂.",
		//             "�낅젰�섏떊 �대찓�쇰줈<br />硫붿씪�� 諛쒖넚�섏��듬땲��."
		//              ]
		
		//var msg = megtxt[idx];
		
		if (typeof cb != 'undefined') callback = cb;
		// cb의 자료값이 undefined가 아니라면 callback에 cb대입
		// ''가 없어야 될것!?
		
		blind();
		// blind함수 실행
		
		$('body').append('<div class="msgbox">'+
				'<button class="close">�リ린</button>'+
				'<p>'+msg+'</p>'+
				'<div class="btn-group"><a href="" class="radius_btn ok org"><span></span><span>�뺤씤</span><span></span></a></div>'+
				'</div>')
		// body에 메세지 박스 첨부
		
		$('.msgbox').find('button').addClass('close');
		// 메세지 박스의 버튼에 class close 지정
		$('.msgbox').find('.radius_btn').addClass('comfim');
		// 메세지 박스의 .radius_btn에 class comfim지정
		centerpop($('.msgbox'))
		// 메세지 박스에 centerpop함수 적용
		
		
		$('.msgbox').animate({
			// 메세지박스에 애니메이션 설정
			'top':'+=25%'
			// 현 위치에서 25% 더한 만큼 올라감
		})
		
	}
	
	window.msgbox = messageAlet;
	// window객체의 msgbox속성에 messageAlet함수 내용 적용
	
	$('body').on("click", ".msgbox .ok", function(){
	// body를 click시 .msgbox .ok에 함수가 실행되도록 설정
		$('.msgbox').remove();
		// .msgbox 삭제
		$('.blind').remove();
		// .blind삭제
		callback();
		// callback함수 실행
		callback = function(){};
		return false;
		// 다른기능 차단
	});
	
	$('body').on("click", ".msgbox .close", function(){
	// body를 click시 .msgbox .close에 함수가 실행되도록 설정
		$('.msgbox').remove();
		// .msgbox 삭제
		$('.blind').remove();
		// .blind삭제
		callback();
		// callback함수 실행
		callback = function(){};
		return false;
		// 다른기능 차단
	});
	
	$('.msgbox .close').click(function(){
	// 클릭시 함수가 실행
		$('.msgbox').remove();
		// .msgbox 삭제
		$('.blind').remove();
		// .blind삭제
		return false;
		// 다른기능 차단
	})
	
	$('.msgbox .comfim').click(function(){
		// 클릭시 함수가 실행
		$('.msgbox').remove();
		// .msgbox 삭제
		$('.blind').remove();
		// .blind삭제
		return false;
		// 다른기능 차단
	})
	
	
	
	$('.infopopup').on({
		click:function(){
	// .infopopup 클릭시 함수가 실행되도록 설정	
			var content = $(this).children('div').html();
			// .infopopup의 자식요소 div의 html을 content 저장
			blind();
			// blind함수 실행
			$('body').append('<div class="company_popup mobile"><button>�リ린</button></div>')
			// body의 자식요소에 팝업과 버튼을 첨부
			$('.company_popup').children('button').addClass('close');
			// 팝업의 버튼에 class close지정
			$('.company_popup').append('<div class="pro-pop-wrap">'+content+'</div>')
			팝업에 wrap과 content 내용 첨부
			centerpop($('.company_popup'))
			// 팝업에 centerpop함수 적용
			$('.close , .company_popup .btngroup>a').click(function(){
			// 클릭시 함수가 실행
				console.log('aa')
				$('.company_popup').remove();
				// .company_popup 삭제
				$('.blind').remove();
				// .blind 삭제
				return false;
				// 다른기능 차단
			});
			
			return false;
			// 다른기능 차단
		}
	})	
	
	
	
	
	
		
	$('.ea_modify').click(function(){
	// 클릭시 함수 실행	

		var content = $('.ea_modify_pop').html()
		// .ea_modify_pop의 html내용을 content에 저장
		blind();
		// blind함수 실행
		
		$('body').append('<div class="ea_popup"><button>�リ린</button></div>')
		// body에 팝업과 버튼 첨부
		$('.ea_popup').children('button').addClass('close');
		// 팝업의 버튼에 class close지정
		$('.ea_popup').append('<div class="pro-pop-wrap">'+content+'</div>')
		// 팝업의 버튼에 class close지정
		centerpop($('.ea_popup'))
		// 팝업에 centerpop함수 적용
		$('.close , .ea_popup .btngroup>a').click(function(){
		// 클릭시 함수 실행	
			$('.ea_popup').remove();
			// .ea_popup 삭제
			$('.blind').remove();
			// .blind 삭제
			return false;
			// 다른기능 차단
		});
		
		return false;
		// 다른기능 차단
	});

	
	

	
	//tab	
	$('.proview-tab.depth2>ul>li').click(function(){
		// click시 함수 실행
		probanner($(this))
		// 현 위치에 probanner함수 실행
		return false;
		// 다른기능 차단
	})

	$('.proview-tab.depth2>ul>li>div>ul>li').click(function(){
		// click시 함수 실행
		probanner($(this))
		// 현 위치에 probanner함수 실행
		return false;
		// 다른기능 차단
	})

	$('.proview-tab.depth2>ul>li>div>ul>li>ul>li>p>a').click(function(){
		// click시 함수 실행
		probanner($(this),1)
		// 현 위치에 probanner함수 실행
		return false;
		// 다른기능 차단
	})
		
	$('.one_tap>ul>li').click(function(){
		// click시 함수 실행
		probanner($(this))
		// 현 위치에 probanner함수 실행
		return false;
		// 다른기능 차단
	})
	$('.one_tap>ul>li>ul>li').click(function(){
		// click시 함수 실행
		probanner($(this))
		// 현 위치에 probanner함수 실행
		return false;
		// 다른기능 차단
	})

	$('.normaltap>ul>li').click(function(){
		// click시 함수 실행
		probanner($(this))
		// 현 위치에 probanner함수 실행
		return false;
		// 다른기능 차단
	})
	
	$('.proveiw-gride.sidetap ul li').click(function(){
		// click시 함수 실행
		probanner($(this))
		// 현 위치에 probanner함수 실행
		return false;
		// 다른기능 차단
	})
	
	$('.solotap > ul > li').click(function(){
		// click시 함수 실행
		probanner($(this))
		// 현 위치에 probanner함수 실행
		return false;
		// 다른기능 차단
	})


	function probanner(target,target){
	// 매개변수 target, target으로 probanner함수 선언
			
			if(depth == undefined) target.addClass('on').siblings('li').removeClass('on')
			// 매개변수 depth 가 undefined 라면 매개변수 target에 class on을 add하고 형제요소 li들의 class on을 지움
			if(depth == 1) target.parent().parent('li').addClass('on').siblings('li').removeClass('on')
			// 매개변수 depth 가 1이면 매개변수 target의 부모의 부모요소 li에 class on을 add하고 형제요소 li들의 class on을 지움
			
		}
	
	
	
	

		
	
});