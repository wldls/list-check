(function($){
	var defaults = {
		chkBox: '.list_chk',
		chkAll: '.list_chk_all',
		bgRow: false,
		bgCls: '',
		bgColor: '',
		afterCheck:function(e){},
		// afterCheckAll:function(e){}
	}

	function Plugin(element, options){		
		this.w = $(document);
		this.e = $(element);		
		this.options = $.extend({}, defaults, options);
		this.init();
	}

	Plugin.prototype = {
		init: function(){
			var that = this,
				opt = that.options,
				$element = that.e;

			// 선택
			$element.on('click', function(e){
				var target = $(e.target);
				if(!target.prop('disabled')){
					that.checkEvent(e);
				}
			});

			// 전체선택
			$(document).on('click', opt.chkAll, function(e){
				that.checkAllEvent(e);
			});
		},
		checkEvent: function(e){
			var that = this,
				opt = that.options,
				$chkBox = $(opt.chkBox).not(':disabled'),
				hasBgCls = opt.bgCls !== '',
				hasBgCode = opt.bgColor !== '';

				// 체크된 tr에 bg색상 변경
				var $target = $(e.target),
					$targetTr = $target.parents('tr'),
					isChecked = $target.prop('checked');

				if(opt.bgRow && isChecked){
					if(opt.bgRow){
						if(hasBgCls){
							// 체크된 tr에 bg색상 변경						
							$targetTr.addClass(opt.bgCls);
						}else if(hasBgCode){
							// 체크된 tr에 입력한 컬러값으로 변경
							$targetTr.css('background', opt.bgColor);
						}else{
							console.error('클래스 또는 컬러값을 입력해주세요');
						}						
					}
				}else if(opt.bgRow && !isChecked){
					if(opt.bgRow){
						if(hasBgCls){
							// 체크된 tr에 bg색상 변경		
							$targetTr.removeClass(opt.bgCls);
						}else if(hasBgCode){

							// 체크된 tr에 입력한 컬러값으로 변경
							$targetTr.css('background-color', 'transparent');
						}else{
							console.error('클래스명 또는 컬러값을 입력해주세요');
						}						
					}
				}

				// 체크박스 모두 선택시 전체선택 checked
				if($chkBox.not(':checked').length > 0){
					$(opt.chkAll).prop('checked', false);
				}else{
					$(opt.chkAll).prop('checked', true);
				}

				opt.afterCheck.call(this, e);
		},
		checkAllEvent: function(e){
			var that = this,
				opt = that.options,
				$chkBox = $(opt.chkBox).not(':disabled'),
				$checkedTr = $chkBox.parents('tr'),
				hasBgCls = opt.bgCls !== '',
				hasBgCode = opt.bgColor !== '';

			// 전체선택할 때 하위 체크박스 모두선택				
			if($(opt.chkAll).prop('checked')){
				$chkBox.prop('checked', true);
				
				if(opt.bgRow){
					if(hasBgCls){
						// 체크된 tr에 bg색상 변경						
						$checkedTr.addClass(opt.bgCls);
					}else if(hasBgCode){
						// 체크된 tr에 입력한 컬러값으로 변경
						$checkedTr.css('background-color', opt.bgColor);
					}else{
						console.error('클래스명 또는 컬러값을 입력해주세요');
					}
				}
			}else{
				$chkBox.prop('checked', false);

				if(opt.bgRow){
					if(hasBgCls){
						// 체크된 tr에 bg색상 변경		
						$checkedTr.removeClass(opt.bgCls);
					}else if(hasBgCode){

						// 체크된 tr에 입력한 컬러값으로 변경
						$checkedTr.css('background-color', 'transparent');
					}else{
						console.error('클래스명 또는 컬러값을 입력해주세요');
					}						
				}
			}

			opt.afterCheck.call(this, e);
		}
	}

	$.fn.listCheck = function(options){
		var plugin = new Plugin(this, options);
		// return this.each(function(){
		// 	var plugin = new Plugin(this, options);
		// });
	};	
}(jQuery));