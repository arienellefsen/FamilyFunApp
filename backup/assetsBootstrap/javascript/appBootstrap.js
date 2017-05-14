
$(function(){
        var carousel = $('.carousel ul');
        var carouselChild = carousel.find('li');
        var clickCount = 0;
        var canClick = true;

        itemWidth = carousel.find('li:first').width()+1; //Including margin

        //Set Carousel width so it won't wrap
        carousel.width(itemWidth*carouselChild.length);

        //Place the child elements to their original locations.
        refreshChildPosition();

        //Set the event handlers for buttons.
        $('.btnNext').click(function(){
            if(canClick){
                canClick = false;
                clickCount++;

                //Animate the slider to left as item width 
                carousel.stop(false, true).animate({
                    left : '-='+itemWidth
                },300, function(){
                    //Find the first item and append it as the last item.
                    lastItem = carousel.find('li:first');
                    lastItem.remove().appendTo(carousel);
                    lastItem.css('left', ((carouselChild.length-1)*(itemWidth))+(clickCount*itemWidth));
                    canClick = true;
                });
            }
        });

        $('.btnPrevious').click(function(){
            if(canClick){
                canClick = false;
                clickCount--;
                //Find the first item and append it as the last item.
                lastItem = carousel.find('li:last');
                lastItem.remove().prependTo(carousel);

                lastItem.css('left', itemWidth*clickCount);             
                //Animate the slider to right as item width 
                carousel.finish(true).animate({
                    left: '+='+itemWidth
                },300, function(){
                    canClick = true;
                });
            }
        });

        function refreshChildPosition(){
            carouselChild.each(function(){
                $(this).css('left', itemWidth*carouselChild.index($(this)));
            });
        }
    });$(function(){
        var carousel = $('.carousel ul');
        var carouselChild = carousel.find('li');
        var clickCount = 0;
        var canClick = true;

        itemWidth = carousel.find('li:first').width()+1; //Including margin

        //Set Carousel width so it won't wrap
        carousel.width(itemWidth*carouselChild.length);

        //Place the child elements to their original locations.
        refreshChildPosition();

        //Set the event handlers for buttons.
        $('.btnNext').click(function(){
            if(canClick){
                canClick = false;
                clickCount++;

                //Animate the slider to left as item width 
                carousel.stop(false, true).animate({
                    left : '-='+itemWidth
                },300, function(){
                    //Find the first item and append it as the last item.
                    lastItem = carousel.find('li:first');
                    lastItem.remove().appendTo(carousel);
                    lastItem.css('left', ((carouselChild.length-1)*(itemWidth))+(clickCount*itemWidth));
                    canClick = true;
                });
            }
        });

        $('.btnPrevious').click(function(){
            if(canClick){
                canClick = false;
                clickCount--;
                //Find the first item and append it as the last item.
                lastItem = carousel.find('li:last');
                lastItem.remove().prependTo(carousel);

                lastItem.css('left', itemWidth*clickCount);             
                //Animate the slider to right as item width 
                carousel.finish(true).animate({
                    left: '+='+itemWidth
                },300, function(){
                    canClick = true;
                });
            }
        });

        function refreshChildPosition(){
            carouselChild.each(function(){
                $(this).css('left', itemWidth*carouselChild.index($(this)));
            });
        }
    });