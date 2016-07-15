$(function(){
    
    var modal_function = {
        
        makeBlind : function(){
            
            var bl_tag = '';
            bl_tag += '<div class="blind"></div>';
            
            $('body').prepend(bl_tag);
            $('.blind').css({
                backgroundColor:'#000',
                position:'absolute',
                left:0,
                right:0,
                bottom:0,
                top:0,
                zIndex:1,
                display:'none'
            
            })
            $('.blind').fadeTo(1000,0.8);
        },
        center : function(target){
                
                target.css({
                    left: '50%',
                    top: '50%',
                    marginLeft: -(parseInt(target.css('width')) / 2)+'px',
                    marginTop: -(parseInt(target.css('height')) / 2)+'px',
                    
                })
            },
        makePopUp : function(id){
            
            var pop_tag = '';
            
            pop_tag += '<div class="popUp '+id+'">';
            pop_tag += '<div class="wrap">';
            
            pop_tag += '</div>';
            pop_tag += '<button class="close">닫기</button>';
            pop_tag += '</div>';
            
            $('body').append(pop_tag);
            $('.wrap').load('loadtest.txt .'+id);
            
            this.center( $('.'+id) );
        },
        openPopUp : function(){
            
            var id = $(this).attr('id')
        
            modal_function.makeBlind();
            modal_function.makePopUp(id);
            
            $('.popUp').show(1000);
            
            },
        close : function(){
            $('.blind').fadeOut(1000,function(){ $(this).remove() })
           $('.popUp').hide(1000,function(){ $(this).remove() })
        }
    }
    
    
$('.open').click(modal_function.openPopUp);
$('body').on('click','.close',modal_function.close);

})
